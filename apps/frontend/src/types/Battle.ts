export type ActiveBuff = {
  name: string;
  target: "player" | "enemy";
  affectedStat: "atk" | "def";
  value: number;
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
};
