import type { Item } from "../types/items"
import * as itemRepository from "../data/itemData"

export const getDroppedItems = async (): Promise<Item[]> => {
    try {
        const items = itemRepository.getItems();
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
        itemIds.forEach((id) => itemRepository.removeItemById(id));
    } catch(error){
        throw new Error("failed to discard items")
    }
}