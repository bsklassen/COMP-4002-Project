import type { Item } from "../types/items"
import { itemRepository } from "../repositories/itemRepository";

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