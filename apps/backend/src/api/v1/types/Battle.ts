export type ActiveBuff = {
  name: string;
  target: "player" | "enemy";
  affectedStat: "atk" | "def";
  value: number; // multiplier, e.g. 1.3 = +30%
  turnsRemaining: number;
};

export type Battle = {
  id: string;
  userId: string;
  enemyId: number;
  playerHp: number;
  enemyHp: number;
  activeBuffs: ActiveBuff[];
  isComplete: boolean;
  playerWon: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BattleActionResult = {
  battle: Battle;
  playerDamageDealt: number;
  playerHpRestored?: number;
  enemyMove?: "basic" | "ultimate";
  enemyDamageDealt?: number;
  isComplete: boolean;
  playerWon: boolean | null;
};
