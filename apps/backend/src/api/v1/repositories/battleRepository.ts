import type { Battle, ActiveBuff } from "../types/Battle.js";
import prisma from "../../../../prisma/client.js";

class BattleRepository {
  private useDatabase = Boolean(process.env.DB_URL);
  private battles: Map<string, Battle> = new Map();

  private fromDB(raw: any): Battle {
    return {
      ...raw,
      activeBuffs: Array.isArray(raw.activeBuffs)
        ? (raw.activeBuffs as ActiveBuff[])
        : [],
    };
  }

  async findIncompleteByUserId(userId: string, enemyId: number): Promise<Battle | null> {
    if (!this.useDatabase) {
      for (const battle of this.battles.values()) {
        if (battle.userId === userId && battle.enemyId === enemyId && !battle.isComplete) return { ...battle };
      }
      return null;
    }
    const raw = await prisma.battle.findFirst({ where: { userId, enemyId, isComplete: false } });
    return raw ? this.fromDB(raw) : null;
  }

  async create(data: { userId: string; enemyId: number; playerHp: number; enemyHp: number }): Promise<Battle> {
    if (!this.useDatabase) {
      const now = new Date();
      const battle: Battle = {
        id: crypto.randomUUID(),
        playerWon: null,
        isComplete: false,
        activeBuffs: [],
        createdAt: now,
        updatedAt: now,
        ...data,
      };
      this.battles.set(battle.id, battle);
      return { ...battle };
    }
    const raw = await prisma.battle.create({ data: { ...data, activeBuffs: [] } });
    return this.fromDB(raw);
  }

  async getById(id: string): Promise<Battle | null> {
    if (!this.useDatabase) {
      return this.battles.get(id) ?? null;
    }
    const raw = await prisma.battle.findUnique({ where: { id } });
    return raw ? this.fromDB(raw) : null;
  }

  async update(
    id: string,
    data: Partial<Pick<Battle, "playerHp" | "enemyHp" | "isComplete" | "playerWon" | "activeBuffs">>
  ): Promise<Battle> {
    if (!this.useDatabase) {
      const existing = this.battles.get(id);
      if (!existing) throw new Error(`Battle ${id} not found`);
      const updated: Battle = { ...existing, ...data, updatedAt: new Date() };
      this.battles.set(id, updated);
      return { ...updated };
    }
    const { activeBuffs, ...rest } = data;
    const prismaData: any = { ...rest };
    if (activeBuffs !== undefined) prismaData.activeBuffs = activeBuffs;
    const raw = await prisma.battle.update({ where: { id }, data: prismaData });
    return this.fromDB(raw);
  }
}

export const battleRepository = new BattleRepository();
