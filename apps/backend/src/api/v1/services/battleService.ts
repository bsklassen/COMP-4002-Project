import { battleRepository } from "../repositories/battleRepository.js";
import { enemyRepository } from "../repositories/enemyRepository.js";
import { calculateDamage } from "../utils/damageFormula.js";
import type { Battle, BattleActionResult } from "../types/Battle.js";

const PLAYER_ATK = 50;
const PLAYER_DEF = 30;

const PLAYER_MAX_HP = 100;
const HEAL_AMOUNT = Math.floor(PLAYER_MAX_HP * 0.33);

const PLAYER_ACTIONS = {
  attack: { skillMultiplier: 1.0, damageBonus: 1.0 },
  skill:  { skillMultiplier: 1.4, damageBonus: 1.1 },
} as const;

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

  // Player turn
  let playerDamageDealt = 0;
  let playerHpRestored = 0;
  if (!guardActive && !healActive) {
    const { skillMultiplier, damageBonus } = PLAYER_ACTIONS[action as keyof typeof PLAYER_ACTIONS];
    playerDamageDealt = calculateDamage(skillMultiplier, PLAYER_ATK, damageBonus, enemy.def);
  }
  if (healActive) {
    playerHpRestored = Math.min(HEAL_AMOUNT, PLAYER_MAX_HP - battle.playerHp);
  }
  // Apply heal before enemy attacks so HP is correct for both the death check and the saved value
  const playerHpAfterHeal = Math.min(PLAYER_MAX_HP, battle.playerHp + playerHpRestored);
  const newEnemyHp = Math.max(0, battle.enemyHp - playerDamageDealt);

  // Enemy turn — skip if enemy was just killed
  let enemyMove: "basic" | "ultimate" = "basic";
  let enemyDamageDealt = 0;
  let newPlayerHp = playerHpAfterHeal;

  if (newEnemyHp > 0) {
    enemyMove = Math.random() < 0.7 ? "basic" : "ultimate";
    const enemyMultiplier = enemyMove === "basic" ? enemy.basicMultiplier : enemy.ultimateMultiplier;
    const enemyDmgBonus = enemyMove === "basic" ? enemy.basicDamageBonus : enemy.ultimateDamageBonus;
    const effectiveDef = guardActive ? PLAYER_DEF * 2 : PLAYER_DEF;
    enemyDamageDealt = calculateDamage(enemyMultiplier, enemy.atk, enemyDmgBonus, effectiveDef);
    newPlayerHp = Math.max(0, playerHpAfterHeal - enemyDamageDealt);
  }

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

  const updatedBattle = await battleRepository.update(battleId, {
    playerHp: newPlayerHp,
    enemyHp: newEnemyHp,
    isComplete,
    playerWon,
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
