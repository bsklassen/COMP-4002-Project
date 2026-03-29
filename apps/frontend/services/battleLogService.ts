import type { BattleLogMessage } from '../types/BattleLogMessage';
import * as BattleLogRepo from '../repositories/battleLogRepository';

/**
 * These Service functions handle the business logic of our application.
 * In some cases it is a straightforward delegations to a repo,
 * but in others it involves making a decision about how to invoke
 * a repository.
 */

/**
 * A straightforward request to get all messages from the repository.
 * Sorts messages by timestamp for chronological display.
 * @returns Promise<BattleLogMessage[]> - an array of messages sorted by time
 */
export async function fetchMessages(): Promise<BattleLogMessage[]> {
    const messages = BattleLogRepo.fetchMessages();
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

/**
 * Add a new system message to the battle log.
 * Business logic: System messages are for game events.
 * @param text - The message text
 * @returns Promise<BattleLogMessage> - the created message
 */
export async function addSystemMessage(text: string): Promise<BattleLogMessage> {
    return await BattleLogRepo.createMessage({
        type: 'system',
        text
    });
}

/**
 * Add a new ally message to the battle log.
 * Business logic: Ally messages are for player actions.
 * @param text - The message text
 * @returns Promise<BattleLogMessage> - The created message
 */
export async function addAllyMessage(text: string): Promise<BattleLogMessage> {
    return await BattleLogRepo.createMessage({
        type: 'ally',
        text
    });
}

/**
 * Add a new enemy message to the battle log.
 * Business logic: Enemy messages are for enemy actions and damage
 * feedback.
 * @param text - The message text
 * @returns Promise<BattleLogMEssage> the created message
 */
export async function addEnemyMessage(text: string): Promise<BattleLogMessage> {
    return await BattleLogRepo.createMessage({
        type: 'enemy',
        text
    });
}

/**
 * Process an attack action - adds ally message and schedules enemy response.
 * Business logic: Attack action always results in damage feedback after a delay.
 * This demonstrates business logic by determining the attack sequence and damage values.
 * @param weaponType - The type of weapon used (default: 'sword')
 * @param damage - Amount of damage dealt (default: 15)
 * @returns Promise<BattleLogMEssage[]> - both messaged created
 */
export async function processAttackAction(
    weaponType: string = 'sword',
    damage: number = 15
): Promise<BattleLogMessage[]> {
    const allyMessage = await addAllyMessage(`You strike the enemy with your ${weaponType}!`);

    // Simulate delay for enemy response (business logic: enemy feedback is delayed)
    await new Promise(resolve => setTimeout(resolve, 800));

    const enemyMessage = await addEnemyMessage(`The enemy takes ${damage} damage!`);

    return [allyMessage, enemyMessage];
}

/**
 * Process a skill/spell action - adds ally message and schedules enemy response.
 * Business logic: Skills have different damage and effects than regular attacks.
 * This is a example of business logic by determining that skills deal more damage.
 * @param skillName - Name of the skill used (default: 'Fireball')
 * @param damage - Amount of damage dealt (default: 25)
 * @returns Promise<BattleLogMessage[]> - both messages created
 */
export async function processSkillAction(
    skillName: string = 'Fireball',
    damage: number = 25
): Promise<BattleLogMessage[]> {
    const allyMessage = await addAllyMessage(`You cast ${skillName} on the enemy!`);

    // Simulate delay for enemy response
    await new Promise(resolve => setTimeout(resolve, 800));

    const enemyMessage = await addEnemyMessage(`The enemy is engulfed in flames! ${damage} damage!`);

    return [allyMessage, enemyMessage]
}

/**
 * Process a guard/defend action.
 * Business logic: Guarding is a defensive action with system feedback.
 * @returns Promise<BattleLogMessage> - the system message
 */
export async function processGuardAction(): Promise<BattleLogMessage> {
    return await addSystemMessage('You raise your shield in defense.');
}

/**
 * Start a new battle - clears old messages and adds initial message.
 * Business logic: New battles should have clean state.
 * @returns Promise<BattleLogMessage> - the initial battle message
 */
export async function startNewBattle(): Promise<BattleLogMessage> {
    await BattleLogRepo.clearAllMessages();
    return await addSystemMessage('Battle has begun!');
}

/**
 * Get messages filtered by type
 * Business logic: Sometimes we only want to see certain message types.
 * @param type - The message type to filter by
 * @returns Promise<BattleLogMessage[]> - filtered messages
 */
export async function getMessagesByType(
    type: 'system' | 'ally' | 'enemy'
): Promise<BattleLogMessage[]> {
    const allyMessages = await fetchMessages();
    return allyMessages.filter(msg => msg.type === type);
}