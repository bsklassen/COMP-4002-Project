import type { Battle } from "../types/Battle.js";
import prisma from "../../../../prisma/client.js";

class BattleRepository {
  private useDatabase = Boolean(process.env.DB_URL);
  private battles: Map<string, Battle> = new Map();

  async findIncompleteByUserId(userId: string, enemyId: number): Promise<Battle | null> {
    if (!this.useDatabase) {
      for (const battle of this.battles.values()) {
        if (battle.userId === userId && battle.enemyId === enemyId && !battle.isComplete) return { ...battle };
      }
      return null;
    }
    return prisma.battle.findFirst({ where: { userId, enemyId, isComplete: false } });
  }

  async create(data: { userId: string; enemyId: number; playerHp: number; enemyHp: number }): Promise<Battle> {
    if (!this.useDatabase) {
      const now = new Date();
      const battle: Battle = {
        id: crypto.randomUUID(),
        playerWon: null,
        isComplete: false,
        createdAt: now,
        updatedAt: now,
        ...data,
      };
      this.battles.set(battle.id, battle);
      return { ...battle };
    }
    return prisma.battle.create({ data });
  }

  async getById(id: string): Promise<Battle | null> {
    if (!this.useDatabase) {
      return this.battles.get(id) ?? null;
    }
    return prisma.battle.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Partial<Pick<Battle, "playerHp" | "enemyHp" | "isComplete" | "playerWon">>
  ): Promise<Battle> {
    if (!this.useDatabase) {
      const existing = this.battles.get(id);
      if (!existing) throw new Error(`Battle ${id} not found`);
      const updated: Battle = { ...existing, ...data, updatedAt: new Date() };
      this.battles.set(id, updated);
      return { ...updated };
    }
    return prisma.battle.update({ where: { id }, data });
  }
}

export const battleRepository = new BattleRepository();
