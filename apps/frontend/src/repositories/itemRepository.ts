// // CRUD
// import type { Item } from "../types/items"

// let items: Item[]= [
//     {id: 1, name: "Minor Health Potion"},
//     {id: 2, name: "Broken Straight Sword"},
//     {id: 3, name: "A rusted nail"},
//     {id: 4, name: "An all-seeing eyeball"},
//     {id: 5, name: "A jar of the ghosts of your past"},
//     {id: 6, name: "The claw of a three-winged heron"},
//     {id: 7, name: "The heart of a siren"},
//     {id: 8, name: "A B.F sword"},
//     {id: 9, name: "A feather from a fallen angel"},
//     {id: 10, name: "The key to the universe"},
// ]

// export function getItems(): Item[]{
//     return items;
// }

// export function removeItem(id: number): void {
//     items = items.filter(item => item.id != id);
// }

import type { Item } from "../types/items"

type ItemsResponseJSON = {message: string, data: Item[]};

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const ITEM_ENDPOINT = `/victory/items`;

export async function getItems(): Promise<Item[]> {
    const itemResponse: Response = await fetch(
        `${BASE_URL}${ITEM_ENDPOINT}`
    );

    if(!itemResponse.ok) {
        throw new Error("failed to fetch items");
    }

    const json: ItemsResponseJSON = await itemResponse.json();
    return json.data
}

export async function discardItems(itemIds: number[]):Promise<void> {
    const itemResponse: Response = await fetch(
        `${BASE_URL}${ITEM_ENDPOINT}/discard`,

        {
            method: "POST",
            body: JSON.stringify({itemIds}),
            headers:{
                "Content-Type": "application/json",
            }
        }
    );

    if (!itemResponse.ok) {
        throw new Error ("failed to discard items")
    }
    
}