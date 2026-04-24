import type { Item } from "../types/items.js"
import { itemRepository } from "../repositories/itemRepository.js";

export const getDroppedItems = async (): Promise<Item[]> => {
    try {
        const items = await itemRepository.getAllItems();
        const dropCount = Math.random() < 0.5 ? 2 : 3;
        const droppedItems = [...items]
            .sort(() => Math.random() - 0.5)
            .slice(0, dropCount);
        return droppedItems;
    } catch(error) {
        throw new Error("failed to get items")
    }
}

export const discardItems = async (itemIds: number[]): Promise<void> => {
    try {
        for (const id of itemIds) {
            await itemRepository.delete(id);
        }
    } catch(error) {
        throw new Error("failed to discard items")
    }
}

export const clearUserItems = async (userId: string): Promise<void> => {
    try {
        await itemRepository.clearUserItems(userId);
    } catch(error) {
        throw new Error("failed to clear user items")
    }
}

export const getUserItems = async (userId: string) => {
    try {
        return await itemRepository.getUserItems(userId);
    } catch(error) {
        throw new Error("failed to get user items")
    }
}

export const removeUserItem = async (userId: string, itemId: number): Promise<boolean> => {
    try {
        return await itemRepository.removeUserItem(userId, itemId);
    } catch(error) {
        throw new Error("failed to remove user item")
    }
}

export const grantItems = async (userId: string, itemIds: number[]): Promise<void> => {
    try {
        await itemRepository.grantItems(userId, itemIds);
    } catch(error) {
        throw new Error("failed to grant items to user")
    }
}