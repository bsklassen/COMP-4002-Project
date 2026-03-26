// import { BattleLogMessage } from "@prisma/client";
import * as battleLogRepository from "../repositories/battleLogRepository";

// Get all messages - straight forward delegation to repository
export const fetchAllMessages = async (): Promise<BattleLogMessage[]> => {
    return battleLogRepository.getAllMessages();
};

// Get a single message by ID
export const fetchMessagesById = async (id: number): Promise<BattleLogMessage | null> => {
    return battleLogRepository.getMessageById(id);
};

// Add a new system message to the battle log
// Business logic: system messages are for game events
export const addSystemMessage = async (text: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("system", text);
};

// Add a new ally message to the battle log
// Business logic: system messages are for game events
export const addAllyMessage = async (text: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("ally", text);
};

// Add a new enemy message to the battle log
// Business logic: ally messages are for player actions
export const addEnemyMessage = async (text: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("enemy", text);
};

// Process an attack action - adds ally message ad enemy response
// Business logic: attack action always results in damage feedback
export const processAttackAction = async (
    weaponType: string = "sword",
    damage: number = 15
): Promise<BattleLogMessage[]> => {
    const allyMessage = await addAllyMessage(
        `You strike the enemy with your ${weaponType}!`
    );
    const enemyMessage = await addEnemyMessage(
        `The enemy takes ${damage} damage!`
    );
    return [allyMessage, enemyMessage];
};

// Process a skill action - adds ally message and enemy response
// Business logic: skills deal more damage than regular attacks
export const processSkillAction = async (
    skillName: string = "Fireball",
    damage: number = 25
): Promise<BattleLogMessage[]> => {
    const allyMessage = await addAllyMessage(
        `You cast ${skillName} on the enemy!`
    );
    const enemyMessage = await addEnemyMessage(
        `The enemy is engulfed in flames! ${damage} damage!`
    );
    return [allyMessage, enemyMessage];
};

// Process a guard action
// Business logic: guarding is a defensive action with system feedback
export const processGuardAction = async (): Promise<BattleLogMessage> => {
    return addSystemMessage("You raise your shield in defense.");
};
 
// Start a new battle - clears old messages and adds initial message
// Business logic: new battles should have clean state
export const startNewBattle = async (): Promise<BattleLogMessage> => {
    await battleLogRepository.clearAllMessages();
    return addSystemMessage("Battle has begun!");
};