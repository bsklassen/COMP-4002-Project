import type { Enemy } from "../types/Enemy.js";
import { ENEMIES } from "../../../../prisma/seedData.js";
import prisma from "../../../../prisma/client.js";

class EnemyRepository {
  private seeded = false;
  private useDatabase = Boolean(process.env.DB_URL);
  private enemies: Enemy[] = [...ENEMIES];

  private async ensureSeeded(): Promise<void> {
    if (this.seeded) return;

    if (!this.useDatabase) {
      this.seeded = true;
      return;
    }

    try {
      const existingCount = await prisma.enemy.count();
      if (existingCount === 0) {
        await prisma.enemy.createMany({ data: ENEMIES });
      }
    } catch {
      this.useDatabase = false;
    }

    this.seeded = true;
  }

  async getAll(): Promise<Enemy[]> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      return structuredClone(this.enemies).sort((a, b) => a.order - b.order);
    }
    return prisma.enemy.findMany({ orderBy: { order: "asc" } });
  }

  async getById(id: number): Promise<Enemy | null> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      return this.enemies.find((e) => e.id === id) ?? null;
    }
    return prisma.enemy.findUnique({ where: { id } });
  }

  async getByOrder(order: number): Promise<Enemy | null> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      return this.enemies.find((e) => e.order === order) ?? null;
    }
    return prisma.enemy.findUnique({ where: { order } });
  }
}

export const enemyRepository = new EnemyRepository();
