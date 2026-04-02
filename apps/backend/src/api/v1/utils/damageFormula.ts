export function calculateDamage(
  skillMultiplier: number,
  atk: number,
  damageBonus: number,
  targetDef: number
): number {
  const base = skillMultiplier * atk * damageBonus;
  const mitigated = base * (100 / (100 + targetDef));
  const variance = 0.95 + Math.random() * 0.10;
  return Math.round(mitigated * variance);
}
