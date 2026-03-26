import { PrismaClient, BattleLogMessage } from "@prisma/client";
 
const prisma = new PrismaClient();

// Get all battle log messages ordered by timestamp
export const getAllMessages = async (): Promise<BattleLogMessage[]> => {
    return prisma.battleLogMessage.findMany({
        orderBy: {
            timestamp: "asc"
        }
    });
};
 
// Get a single battle log message by ID
export const getMessageById = async (id: number): Promise<BattleLogMessage | null> => {
    return prisma.battleLogMessage.findUnique({
        where: { id }
    });
};
 
// Create a new battle log message
export const createMessage = async (
    type: string,
    text: string
): Promise<BattleLogMessage> => {
    return prisma.battleLogMessage.create({
        data: {
            type,
            text
        }
    });
};
 
// Delete all battle log messages (used to reset battle state)
export const clearAllMessages = async (): Promise<void> => {
    await prisma.battleLogMessage.deleteMany();
};
 