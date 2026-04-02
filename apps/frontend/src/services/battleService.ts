const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";

export type Enemy = {
  id: number;
  name: string;
  imagePath: string;
  maxHp: number;
  atk: number;
  def: number;
  basicMultiplier: number;
  basicDamageBonus: number;
  ultimateMultiplier: number;
  ultimateDamageBonus: number;
  order: number;
};

export type Battle = {
  id: string;
  userId: string;
  enemyId: number;
  playerHp: number;
  enemyHp: number;
  isComplete: boolean;
  playerWon: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type BattleActionResult = {
  battle: Battle;
  playerDamageDealt: number;
  enemyMove: "basic" | "ultimate";
  enemyDamageDealt: number;
  isComplete: boolean;
  playerWon: boolean | null;
};

export type UserSave = {
  id: string;
  userId: string;
  currentFight: number;
};

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
  action: string
): Promise<BattleActionResult> {
  const res = await fetch(`${API_BASE}/api/v1/battles/${battleId}/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(`playerAction failed: ${res.status}`);
  return res.json();
}

export async function getUserSave(userId: string): Promise<UserSave> {
  const res = await fetch(`${API_BASE}/api/v1/save`, {
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`getUserSave failed: ${res.status}`);
  return res.json();
}

export async function advanceFight(userId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/save/advance`, {
    method: "POST",
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`advanceFight failed: ${res.status}`);
}

export async function resetSave(userId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/save/reset`, {
    method: "POST",
    headers: { "x-user-id": userId },
  });
  if (!res.ok) throw new Error(`resetSave failed: ${res.status}`);
}

export async function getEnemyByOrder(order: number): Promise<Enemy> {
  const res = await fetch(`${API_BASE}/api/v1/enemies/order/${order}`);
  if (!res.ok) throw new Error(`getEnemyByOrder failed: ${res.status}`);
  return res.json();
}
