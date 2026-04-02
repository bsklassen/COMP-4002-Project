// Persona 5 / Solo Leveling: ARISE-style defense formula:
//   damageFactor = BASE_DR / (DEF × DEF_COEFFICIENT + BASE_DR)
//
// Constants are tuned so that player base DEF (30) → 38.4% damage factor (61.6% reduction),
// matching the reference game's "0 shred" single-boss baseline.
// Breakeven point (50% mitigation) = BASE_DR / DEF_COEFFICIENT = 18.7 DEF.
// Full def shred (DEF = 0) → 100% damage through.
const BASE_DR = 187;
const DEF_COEFFICIENT = 10;

export function calculateDamage(
  skillMultiplier: number,
  atk: number,
  damageBonus: number,
  targetDef: number
): number {
  const base = skillMultiplier * atk * damageBonus;
  const damageFactor = BASE_DR / (Math.max(0, targetDef) * DEF_COEFFICIENT + BASE_DR);
  const variance = 0.95 + Math.random() * 0.10;
  return Math.round(base * damageFactor * variance);
}
