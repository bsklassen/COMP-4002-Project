export type Battle = {
  id: string;
  userId: string;
  enemyId: number;
  playerHp: number;
  enemyHp: number;
  isComplete: boolean;
  playerWon: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BattleActionResult = {
  battle: Battle;
  playerDamageDealt: number;
  enemyMove?: "basic" | "ultimate";
  enemyDamageDealt?: number;
  isComplete: boolean;
  playerWon: boolean | null;
};
