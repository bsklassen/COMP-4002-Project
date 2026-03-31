// manages state, calls service, calls repo, component only talks to this thing

import { useState, useEffect } from "react";
import * as itemServices from "../services/itemServices";
import type { Item } from "../types/items.ts"


export function useDroppedItems() {
    const[itemsDiscarded, setItemsDiscarded] = useState<Item[]>([])
    const[selectedItems, setSelectedItems] = useState<Item[]>([])
    const[discardConfirmation, setDiscardConfirmation] = useState(false)
    const[itemsKept, setItemsKept] = useState(false)
    const[itemsDropped, setItemsDropped] = useState<Item[]>([]);
    const[error, setError] = useState<string | null>(null);

    const fetchDroppedItems = async () => {
        try {
            const items = await itemServices.getDroppedItems();
            setItemsDropped(items);
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    }

    useEffect(() => {
        fetchDroppedItems();
    }, []);

    return {itemsDiscarded, setItemsDiscarded, 
            selectedItems, setSelectedItems, 
            discardConfirmation, setDiscardConfirmation,
            itemsKept, setItemsKept,
            itemsDropped, setItemsDropped,
            error}
}
    