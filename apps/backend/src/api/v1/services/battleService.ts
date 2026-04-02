import { battleRepository } from "../repositories/battleRepository.js";
import { enemyRepository } from "../repositories/enemyRepository.js";
import { calculateDamage } from "../utils/damageFormula.js";
import type { Battle, BattleActionResult } from "../types/Battle.js";

const PLAYER_ATK = 50;
const PLAYER_DEF = 30;

const PLAYER_ACTIONS = {
  attack: { skillMultiplier: 1.0, damageBonus: 1.0 },
  skill:  { skillMultiplier: 1.4, damageBonus: 1.1 },
  skill2: { skillMultiplier: 1.2, damageBonus: 1.2 },
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
  action: "attack" | "skill" | "skill2" | "guard"
): Promise<BattleActionResult> {
  const battle = await battleRepository.getById(battleId);
  if (!battle) throw new Error("Battle not found");
  if (battle.isComplete) throw new Error("Battle is already complete");

  const enemy = await enemyRepository.getById(battle.enemyId);
  if (!enemy) throw new Error("Enemy not found");

  const guardActive = action === "guard";

  // Player turn
  let playerDamageDealt = 0;
  if (!guardActive) {
    const { skillMultiplier, damageBonus } = PLAYER_ACTIONS[action];
    playerDamageDealt = calculateDamage(skillMultiplier, PLAYER_ATK, damageBonus, enemy.def);
  }
  const newEnemyHp = Math.max(0, battle.enemyHp - playerDamageDealt);

  // Enemy turn
  const enemyMove: "basic" | "ultimate" = Math.random() < 0.7 ? "basic" : "ultimate";
  const enemyMultiplier = enemyMove === "basic" ? enemy.basicMultiplier : enemy.ultimateMultiplier;
  const enemyDmgBonus = enemyMove === "basic" ? enemy.basicDamageBonus : enemy.ultimateDamageBonus;
  const effectiveDef = guardActive ? PLAYER_DEF * 2 : PLAYER_DEF;
  const enemyDamageDealt = calculateDamage(enemyMultiplier, enemy.atk, enemyDmgBonus, effectiveDef);
  const newPlayerHp = Math.max(0, battle.playerHp - enemyDamageDealt);

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

  return {
    battle: updatedBattle,
    playerDamageDealt,
    enemyMove,
    enemyDamageDealt,
    isComplete,
    playerWon,
  };
}
