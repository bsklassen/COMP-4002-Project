import type { Item } from "../types/items";

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
const ITEM_ENDPOINT = `${API_BASE}/api/v1/victory/items`;

export async function getItems(): Promise<Item[]> {
  const res = await fetch(ITEM_ENDPOINT);
  if (!res.ok) throw new Error(`getItems failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function discardItems(itemIds: number[]): Promise<void> {
  const res = await fetch(`${ITEM_ENDPOINT}/discard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemIds }),
  });
  if (!res.ok) throw new Error(`discardItems failed: ${res.status}`);
}

export async function clearUserItems(userId: string): Promise<void> {
  const res = await fetch(`${ITEM_ENDPOINT}/clear`, {
    method: "POST",
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`clearUserItems failed: ${res.status}`);
}

export async function getUserItems(token: string): Promise<Item[]> {
  const res = await fetch(`${ITEM_ENDPOINT}/inventory`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`getUserItems failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function removeUserItem(userId: string, itemId: number): Promise<void> {
  const res = await fetch(`${ITEM_ENDPOINT}/use`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-user-id": userId },
    body: JSON.stringify({ itemId }),
  });
  if (!res.ok) throw new Error(`removeUserItem failed: ${res.status}`);
}

export async function grantItems(userId: string, itemIds: number[]): Promise<void> {
  const res = await fetch(`${ITEM_ENDPOINT}/grant`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-user-id": userId },
    body: JSON.stringify({ itemIds }),
  });
  if (!res.ok) throw new Error(`grantItems failed: ${res.status}`);
}
