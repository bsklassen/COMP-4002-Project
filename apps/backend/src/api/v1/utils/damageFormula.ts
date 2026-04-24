// Persona 5 X Damage Formula:
// damageFactor = BASE_DR / (DEF × DEF_COEFFICIENT + BASE_DR)

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
