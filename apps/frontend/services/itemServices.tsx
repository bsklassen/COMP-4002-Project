// Business logic

import type { Item } from "../types/items"
import * as itemRepository from "../repositories/itemRepository"

export async function getDroppedItems(): Promise<Item[]>{
    const items = await itemRepository.getItems()
    const droppedItemAmount = Math.random() <0.5 ? 2 : 3;  // will decide to drop either 2 or 3 items
    const randomItems = [...items].sort(() => Math.random() - 0.5);
    return randomItems.slice(0, droppedItemAmount);
}

export async function discardItems(itemIds: number[]): Promise<void> {
    await itemRepository.discardItems(itemIds);
}