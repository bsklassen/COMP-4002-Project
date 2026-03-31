import type { BattleLogMessage, CreateBattleLogMessage } from "../types/BattleLogMessage.ts";
import { battleLogData } from "../data/testBattleLogMessages";

// Currently we use a mock database to simulate having a backend.
// Will be replaced when backend is implemented.

// Start after out test data (IDs 0-9)
let nextId = 10;

/**
 * Get all battle log messages
 * @returns BattleLogMessage[] - array of all messages
 */
export function fetchMessages(): BattleLogMessage[] {
    return battleLogData;
}

/**
 * Get a single battle log message by ID
 * @param messageId - The ID of the message to retrieve
 * @returns BattleLogMessage - The found message
 * @throws Error if message not found
 */
export function getMessageById(messageId: number): BattleLogMessage {
    const foundMessage = battleLogData.find(m => m.id === messageId);
    if (!foundMessage) {
        throw new Error(`Failed to fetch message with ${messageId}.`);
    }
    return foundMessage;
}

/**
 * Create a new battle log message
 * @param messageData - The message data without ID and timestamp
 * @returns BattleLogMessage - The created message
 */
export async function createMessage(messageData: CreateBattleLogMessage): Promise<BattleLogMessage> {
    const newMessage: BattleLogMessage = {
        id: nextId++,
        ...messageData,
        timestamp: new Date()
    };
    battleLogData.push(newMessage);
    return newMessage;
}

/**
 * Update an existing battle log message
 * @param message - The complete message with updates
 * @returns BattleLogMEssage - The updated message
 * @throws Error if message not found
 */
export async function updateMessage(message: BattleLogMessage): Promise<BattleLogMessage> {
    const foundMessageIndex = battleLogData.findIndex(m => m.id === message.id);
    if (foundMessageIndex === -1) {
        throw new Error(`Failed to update message with ${message.id}.`)
    }
    battleLogData[foundMessageIndex] = message;
    return battleLogData[foundMessageIndex];
}

/**
 * Delete a battle log message
 * @param messageId - The ID of the message to delete
 * @returns BattleLogMessage - The deleted message
 * @throws Error if message not found
 */
export async function deleteMessage(messageId: number): Promise<BattleLogMessage> {
    const foundMessageIndex = battleLogData.findIndex(m => m.id === messageId);
    if (foundMessageIndex === -1) {
        throw new Error (`Failed to delete message with ${messageId}.`);
    }
    const deletedMessage = battleLogData[foundMessageIndex];
    battleLogData.splice(foundMessageIndex, 1);
    return deletedMessage;
}

/**
 * Clear all messages (useful for resetting battle state)
 * @returns void
 */
export async function clearAllMessages(): Promise<void> {
    // Clear the array
    battleLogData.length = 0; 
}