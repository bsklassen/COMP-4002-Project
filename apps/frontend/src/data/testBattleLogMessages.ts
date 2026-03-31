import type { BattleLogMessage } from '../types/BattleLogMessage';

/**
 * This array of BattleLogMessages will serve as placeholder data while we don't have a 
 * backend for our app.
 * 
 * We'll use it in our repository to simulate database operations.
 * When we implement the backend, we will replace repository methods with API calls.
 */
export const battleLogData: BattleLogMessage[] = [
    {
        id: 0,
        type: 'system',
        text: 'Battle has begun!',
        timestamp: new Date('2026-02-24T10:00:00')
    },
    {
        id: 1,
        type: 'ally',
        text: 'You draw your sword and prepare for combat.',
        timestamp: new Date('2026-02-24T10:00:05')
    },
    {
        id: 2,
        type: 'enemy',
        text: 'The goblin snarls and charges toward you!',
        timestamp: new Date('2026-02-24T10:00:08')
    },
    {
        id: 3,
        type: 'ally',
        text: 'You strike the enemy with your sword!',
        timestamp: new Date('2026-02-24T10:00:12')
    },
    {
        id: 4,
        type: 'enemy',
        text: 'The enemy takes 15 damage!',
        timestamp: new Date('2026-02-24T10:00:13')
    },
    {
        id: 5,
        type: 'ally',
        text: 'You cast Fireball on the enemy!',
        timestamp: new Date('2026-02-24T10:00:18')
    },
    {
        id: 6,
        type: 'enemy',
        text: 'The enemy is engulfed in flames! 25 damage!',
        timestamp: new Date('2026-02-24T10:00:19')
    },
    {
        id: 7,
        type: 'enemy',
        text: 'The goblin swings its rusty blade at you!',
        timestamp: new Date('2026-02-24T10:00:22')
    },
    {
        id: 8,
        type: 'system',
        text: 'You blocked the attack!',
        timestamp: new Date('2026-02-24T10:00:23')
    },
    {
        id: 9,
        type: 'ally',
        text: 'You raise your shield in defense.',
        timestamp: new Date('2026-02-24T10:00:27')
    }
];
