import type { ActiveBuff } from "../types/Battle.js";

/**
 * Computes the effective value of a stat after applying all matching buffs.
 * Each matching buff multiplies the base stat (stacks multiplicatively).
 */
export function getEffectiveStat(
  baseStat: number,
  affectedStat: ActiveBuff["affectedStat"],
  target: ActiveBuff["target"],
  buffs: ActiveBuff[]
): number {
  const multiplier = buffs
    .filter((b) => b.target === target && b.affectedStat === affectedStat)
    .reduce((acc, b) => acc * b.value, 1);
  return Math.round(baseStat * multiplier);
}

/**
 * Decrements turnsRemaining on every buff by 1, removing any that expire.
 */
export function decrementBuffs(buffs: ActiveBuff[]): ActiveBuff[] {
  return buffs
    .map((b) => ({ ...b, turnsRemaining: b.turnsRemaining - 1 }))
    .filter((b) => b.turnsRemaining > 0);
}
