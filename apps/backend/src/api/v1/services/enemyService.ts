import { enemyRepository } from "../repositories/enemyRepository.js";
import type { Enemy } from "../types/Enemy.js";

export async function getAllEnemies(): Promise<Enemy[]> {
  return enemyRepository.getAll();
}

export async function getEnemyByOrder(order: number): Promise<Enemy | null> {
  return enemyRepository.getByOrder(order);
}
