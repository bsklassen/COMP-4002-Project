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
      const direct = this.enemies.find((e) => e.order === order);
      if (direct) return direct;
      // For floors beyond seed count, deterministically pick from the pool
      // using a simple hash so the same floor always returns the same enemy.
      const count = this.enemies.length;
      if (count === 0) return null;
      const idx = ((order * 1664525 + 1013904223) >>> 0) % count;
      return { ...this.enemies[idx] };
    }
    const raw = await prisma.enemy.findUnique({ where: { order } });
    if (raw) return raw;
    // For floors beyond seed count, deterministically pick from the pool.
    const all = await prisma.enemy.findMany({ orderBy: { id: "asc" } });
    if (all.length === 0) return null;
    const idx = ((order * 1664525 + 1013904223) >>> 0) % all.length;
    return all[idx];
  }
}

export const enemyRepository = new EnemyRepository();
