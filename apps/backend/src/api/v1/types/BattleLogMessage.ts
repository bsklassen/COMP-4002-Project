export type BattleLogMessage = {
    id: number;
    type: 'system' | 'ally' | 'enemy';
    text: string;
    timestamp: Date;
};

export type CreateBattleLogMessage = Omit<BattleLogMessage, 'id' | 'timestamp'>;
