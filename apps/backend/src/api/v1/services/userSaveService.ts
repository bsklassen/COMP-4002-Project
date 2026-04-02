import { userSaveRepository } from "../repositories/userSaveRepository.js";
import type { UserSave } from "../types/UserSave.js";

export async function getUserSave(userId: string): Promise<UserSave | null> {
  return userSaveRepository.getByUserId(userId);
}

export async function advanceFight(userId: string): Promise<UserSave> {
  const save = await userSaveRepository.getByUserId(userId);
  const currentFight = save ? save.currentFight + 1 : 2;
  return userSaveRepository.upsert(userId, currentFight);
}

export async function resetSave(userId: string): Promise<UserSave> {
  return userSaveRepository.upsert(userId, 1);
}
