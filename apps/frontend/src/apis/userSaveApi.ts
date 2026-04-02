import type { UserSave } from "../types/UserSave";

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";

export async function getUserSave(userId: string): Promise<UserSave> {
  const res = await fetch(`${API_BASE}/api/v1/save`, {
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`getUserSave failed: ${res.status}`);
  return res.json();
}

export async function advanceFight(userId: string): Promise<UserSave> {
  const res = await fetch(`${API_BASE}/api/v1/save/advance`, {
    method: "POST",
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`advanceFight failed: ${res.status}`);
  return res.json();
}

export async function resetSave(userId: string): Promise<UserSave> {
  const res = await fetch(`${API_BASE}/api/v1/save/reset`, {
    method: "POST",
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`resetSave failed: ${res.status}`);
  return res.json();
}
