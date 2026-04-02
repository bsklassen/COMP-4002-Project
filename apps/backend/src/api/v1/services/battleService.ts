import { battleRepository } from "../repositories/battleRepository.js";
import { enemyRepository } from "../repositories/enemyRepository.js";
import { calculateDamage } from "../utils/damageFormula.js";
import { getEffectiveStat, decrementBuffs } from "../utils/buffUtils.js";
import type { Battle, BattleActionResult, ActiveBuff } from "../types/Battle.js";

const PLAYER_ATK = 50;
const PLAYER_DEF = 30;

const PLAYER_MAX_HP = 100;
const HEAL_AMOUNT = Math.floor(PLAYER_MAX_HP * 0.33);

const PLAYER_ACTIONS = {
  attack: { skillMultiplier: 1.0, damageBonus: 1.0 },
  skill:  { skillMultiplier: 1.4, damageBonus: 1.1 },
} as const;

const GUARD_BUFF: ActiveBuff = {
  name: "Guard",
  target: "player",
  affectedStat: "def",
  value: 1.3,
  turnsRemaining: 3,
};

export async function startBattle(userId: string, enemyId: number): Promise<Battle> {
  const existing = await battleRepository.findIncompleteByUserId(userId, enemyId);
  if (existing) return existing;

  const enemy = await enemyRepository.getById(enemyId);
  if (!enemy) throw new Error("Enemy not found");

  return battleRepository.create({
    userId,
    enemyId,
    playerHp: 100,
    enemyHp: enemy.maxHp,
  });
}

export async function playerAction(
  battleId: string,
  action: "attack" | "skill" | "heal" | "guard"
): Promise<BattleActionResult> {
  const battle = await battleRepository.getById(battleId);
  if (!battle) throw new Error("Battle not found");
  if (battle.isComplete) throw new Error("Battle is already complete");

  const enemy = await enemyRepository.getById(battle.enemyId);
  if (!enemy) throw new Error("Enemy not found");

  const guardActive = action === "guard";
  const healActive = action === "heal";

  // Copy current buffs so we can mutate for this turn
  let currentBuffs: ActiveBuff[] = [...battle.activeBuffs];

  // Guard: add buff or refresh it if already active
  if (guardActive) {
    const idx = currentBuffs.findIndex((b) => b.name === "Guard" && b.target === "player");
    if (idx >= 0) currentBuffs[idx] = { ...GUARD_BUFF };
    else currentBuffs.push({ ...GUARD_BUFF });
  }

  // Player turn — effective ATK ready for future ATK buffs
  const effectiveAtk = getEffectiveStat(PLAYER_ATK, "atk", "player", currentBuffs);
  let playerDamageDealt = 0;
  let playerHpRestored = 0;
  if (!guardActive && !healActive) {
    const { skillMultiplier, damageBonus } = PLAYER_ACTIONS[action as keyof typeof PLAYER_ACTIONS];
    playerDamageDealt = calculateDamage(skillMultiplier, effectiveAtk, damageBonus, enemy.def);
  }
  if (healActive) {
    playerHpRestored = Math.min(HEAL_AMOUNT, PLAYER_MAX_HP - battle.playerHp);
  }
  // Apply heal before enemy attacks
  const playerHpAfterHeal = Math.min(PLAYER_MAX_HP, battle.playerHp + playerHpRestored);
  const newEnemyHp = Math.max(0, battle.enemyHp - playerDamageDealt);

  // Enemy turn — skip if enemy was just killed; use buffed player DEF
  let enemyMove: "basic" | "ultimate" = "basic";
  let enemyDamageDealt = 0;
  let newPlayerHp = playerHpAfterHeal;

  if (newEnemyHp > 0) {
    enemyMove = Math.random() < 0.7 ? "basic" : "ultimate";
    const enemyMultiplier = enemyMove === "basic" ? enemy.basicMultiplier : enemy.ultimateMultiplier;
    const enemyDmgBonus   = enemyMove === "basic" ? enemy.basicDamageBonus : enemy.ultimateDamageBonus;
    const effectiveDef = getEffectiveStat(PLAYER_DEF, "def", "player", currentBuffs);
    enemyDamageDealt = calculateDamage(enemyMultiplier, enemy.atk, enemyDmgBonus, effectiveDef);
    newPlayerHp = Math.max(0, playerHpAfterHeal - enemyDamageDealt);
  }

  // Decrement all buff timers at end of round; clear on battle end
  const updatedBuffs = decrementBuffs(currentBuffs);

  // Resolve outcome
  let isComplete = false;
  let playerWon: boolean | null = null;

  if (newEnemyHp <= 0) {
    isComplete = true;
    playerWon = true;
  } else if (newPlayerHp <= 0) {
    isComplete = true;
    playerWon = false;
  }

  const finalBuffs = isComplete ? [] : updatedBuffs;

  const updatedBattle = await battleRepository.update(battleId, {
    playerHp: newPlayerHp,
    enemyHp: newEnemyHp,
    isComplete,
    playerWon,
    activeBuffs: finalBuffs,
  });

  const result: BattleActionResult = {
    battle: updatedBattle,
    playerDamageDealt,
    isComplete,
    playerWon,
  };

  if (playerHpRestored > 0) {
    result.playerHpRestored = playerHpRestored;
  }

  if (newEnemyHp > 0) {
    result.enemyMove = enemyMove;
    result.enemyDamageDealt = enemyDamageDealt;
  }

  return result;
}
