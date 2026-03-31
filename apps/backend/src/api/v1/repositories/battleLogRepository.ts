import { PrismaClient } from "@prisma/client";
import type { BattleLogMessage } from "@prisma/client";
 
const prisma = new PrismaClient();
 
// Get all battle log messages for a specific user ordered by timestamp
export const getAllMessages = async (userId: string): Promise<BattleLogMessage[]> => {
    return prisma.battleLogMessage.findMany({
        where: { userId },
        orderBy: { timestamp: "asc" }
    });
};
 
// Get a single battle log message by ID
export const getMessageById = async (id: number): Promise<BattleLogMessage | null> => {
    return prisma.battleLogMessage.findUnique({
        where: { id }
    });
};
 
// Create a new battle log message for a specific user
export const createMessage = async (
    type: string,
    text: string,
    userId: string
): Promise<BattleLogMessage> => {
    return prisma.battleLogMessage.create({
        data: { type, text, userId }
    });
};
 
// Delete all battle log messages for a specific user (used to reset battle state)
export const clearAllMessages = async (userId: string): Promise<void> => {
    await prisma.battleLogMessage.deleteMany({
        where: { userId }
    });
};