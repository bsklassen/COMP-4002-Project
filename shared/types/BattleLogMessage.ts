/**
 * Represents a single message in the battle log
 */
export type BattleLogMessage = {
    id: number;
    type: 'system' | 'ally' | 'enemy';
    text: string;
    timestamp: Date;
}

/**
 * Type for creating a new battle log message (without id and timestamp)
 */
export type CreateBattleLogMessage = Omit<BattleLogMessage, 'id' | 'timestamp'>;