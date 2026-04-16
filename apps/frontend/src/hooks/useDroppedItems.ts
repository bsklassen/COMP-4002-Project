// manages state, calls service, calls repo, component only talks to this thing

import { useState, useEffect } from "react";
import { getItems, grantItems } from "../apis/itemApi";
import type { Item } from "../types/items.ts"


export function useDroppedItems(userId: string | null) {
    const[itemsDiscarded, setItemsDiscarded] = useState<Item[]>([])
    const[selectedItems, setSelectedItems] = useState<Item[]>([])
    const[discardConfirmation, setDiscardConfirmation] = useState(false)
    const[itemsKept, setItemsKept] = useState(false)
    const [itemsDropped, setItemsDropped] = useState<Item[]>([]);

    useEffect(() => {
        if (!userId) return;
        const uid = userId; // capture non-null for async closure
        let cancelled = false;

        async function fetchAndGrant() {
            try {
                const allItems = await getItems();
                if (cancelled) return;
                const dropCount = Math.random() < 0.5 ? 2 : 3;
                const dropped = [...allItems]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, dropCount);
                setItemsDropped(dropped);
                await grantItems(uid, dropped.map((i) => i.id));
            } catch {
                // Non-fatal
            }
        }

        void fetchAndGrant();
        return () => { cancelled = true; };
    }, [userId]);

    return {itemsDiscarded, setItemsDiscarded, 
            selectedItems, setSelectedItems, 
            discardConfirmation, setDiscardConfirmation,
            itemsKept, setItemsKept,
            itemsDropped, setItemsDropped}
}
