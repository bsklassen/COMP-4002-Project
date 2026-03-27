// Business logic

import type { Item } from "../types/items"
import * as itemRepository from "../repositories/itemRepository"

export function droppedItemRandomizer(): Item[]{
    const items = itemRepository.getItems()
    const droppedItemAmount = Math.random() <0.5 ? 2 : 3;  // will decide to drop either 2 or 3 items
    const randomItems = [...items].sort(() => Math.random() - 0.5);
    return randomItems.slice(0, droppedItemAmount);
}