export type Enemy = {
  id: number;
  name: string;
  imagePath: string;
  maxHp: number;
  atk: number;
  def: number;
  basicMultiplier: number;
  basicDamageBonus: number;
  ultimateMultiplier: number;
  ultimateDamageBonus: number;
  order: number;
};
