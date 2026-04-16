import type { UserSave } from "../types/UserSave.js";
import prisma from "../../../../prisma/client.js";

class UserSaveRepository {
  private useDatabase = Boolean(process.env.DB_URL);
  private saves: Map<string, UserSave> = new Map();

  async getByUserId(userId: string): Promise<UserSave | null> {
    if (!this.useDatabase) {
      return this.saves.get(userId) ?? null;
    }
    return prisma.userSave.findUnique({ where: { userId } });
  }

  async upsert(userId: string, currentFight: number): Promise<UserSave> {
    if (!this.useDatabase) {
      const existing = this.saves.get(userId);
      const save: UserSave = {
        id: existing?.id ?? crypto.randomUUID(),
        userId,
        currentFight,
      };
      this.saves.set(userId, save);
      return { ...save };
    }
    return prisma.userSave.upsert({
      where: { userId },
      update: { currentFight },
      create: { userId, currentFight },
    });
  }
}

export const userSaveRepository = new UserSaveRepository();
