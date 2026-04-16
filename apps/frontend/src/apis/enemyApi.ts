import type { Enemy } from "../types/Enemy";

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";

export async function getEnemyByOrder(order: number): Promise<Enemy> {
  const res = await fetch(`${API_BASE}/api/v1/enemies/order/${order}`);
  if (!res.ok) throw new Error(`getEnemyByOrder failed: ${res.status}`);
  return res.json();
}

export async function getAllEnemies(): Promise<Enemy[]> {
  const res = await fetch(`${API_BASE}/api/v1/enemies`);
  if (!res.ok) throw new Error(`getAllEnemies failed: ${res.status}`);
  return res.json();
}

export async function getEnemyById(id: number): Promise<Enemy> {
  const res = await fetch(`${API_BASE}/api/v1/enemies/${id}`);
  if (!res.ok) throw new Error(`getEnemyById failed: ${res.status}`);
  return res.json();
}
