import type { Battle } from "../types/Battle";

type BattleActionResult = {
  battle: Battle;
  playerDamageDealt: number;
  playerHpRestored?: number;
  enemyMove?: "basic" | "ultimate";
  enemyDamageDealt?: number;
  isComplete: boolean;
  playerWon: boolean | null;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";

export async function startBattle(enemyId: number, userId: string): Promise<Battle> {
  const res = await fetch(`${API_BASE}/api/v1/battles/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-user-id": userId },
    body: JSON.stringify({ enemyId }),
  });
  if (!res.ok) throw new Error(`startBattle failed: ${res.status}`);
  return res.json();
}

export async function playerAction(
  battleId: string,
  action: "attack" | "skill" | "heal" | "guard"
): Promise<BattleActionResult> {
  const res = await fetch(`${API_BASE}/api/v1/battles/${battleId}/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`playerAction failed: ${res.status}`);
  return res.json();
}
