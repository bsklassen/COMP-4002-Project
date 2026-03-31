import type { BattleLogMessage } from "@prisma/client";
import * as battleLogRepository from "../repositories/battleLogRepository.js";
 
// Get all messages for a specific user
export const fetchAllMessages = async (userId: string): Promise<BattleLogMessage[]> => {
    return battleLogRepository.getAllMessages(userId);
};
 
// Get a single message by ID
export const fetchMessageById = async (id: number): Promise<BattleLogMessage | null> => {
    return battleLogRepository.getMessageById(id);
};
 
// Add a new system message for a specific user
export const addSystemMessage = async (text: string, userId: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("system", text, userId);
};
 
// Add a new ally message for a specific user
export const addAllyMessage = async (text: string, userId: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("ally", text, userId);
};
 
// Add a new enemy message for a specific user
export const addEnemyMessage = async (text: string, userId: string): Promise<BattleLogMessage> => {
    return battleLogRepository.createMessage("enemy", text, userId);
};
 
// Process an attack action for a specific user
export const processAttackAction = async (
    userId: string,
    weaponType: string = "sword",
    damage: number = 15
): Promise<BattleLogMessage[]> => {
    const allyMessage = await addAllyMessage(
        `You strike the enemy with your ${weaponType}!`, userId
    );
    const enemyMessage = await addEnemyMessage(
        `The enemy takes ${damage} damage!`, userId
    );
    return [allyMessage, enemyMessage];
};
 
// Process a skill action for a specific user
export const processSkillAction = async (
    userId: string,
    skillName: string = "Fireball",
    damage: number = 25
): Promise<BattleLogMessage[]> => {
    const allyMessage = await addAllyMessage(
        `You cast ${skillName} on the enemy!`, userId
    );
    const enemyMessage = await addEnemyMessage(
        `The enemy is engulfed in flames! ${damage} damage!`, userId
    );
    return [allyMessage, enemyMessage];
};
 
// Process a guard action for a specific user
export const processGuardAction = async (userId: string): Promise<BattleLogMessage> => {
    return addSystemMessage("You raise your shield in defense.", userId);
};
 
// Start a new battle for a specific user - clears old messages and adds initial message
export const startNewBattle = async (userId: string): Promise<BattleLogMessage> => {
    await battleLogRepository.clearAllMessages(userId);
    return addSystemMessage("Battle has begun!", userId);
};