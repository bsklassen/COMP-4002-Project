// manages state, calls service, calls repo, component only talks to this thing

import { useState } from "react";
import * as itemServices from "../services/itemServices";
import type { Item } from "../types/items"


export function useDroppedItems() {
    const[itemsDiscarded, setItemsDiscarded] = useState<Item[]>([])
    const[selectedItems, setSelectedItems] = useState<Item[]>([])
    const[discardConfirmation, setDiscardConfirmation] = useState(false)
    const[itemsKept, setItemsKept] = useState(false)
    const [itemsDropped, setItemsDropped] = useState<Item[]>(
        itemServices.droppedItemRandomizer()
    );

    return {itemsDiscarded, setItemsDiscarded, 
            selectedItems, setSelectedItems, 
            discardConfirmation, setDiscardConfirmation,
            itemsKept, setItemsKept,
            itemsDropped, setItemsDropped}
}
    