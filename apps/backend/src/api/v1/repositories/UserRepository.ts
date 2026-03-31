import type { User, NewUser } from "../types/User.js";
import { usersTestData } from "../data/usersTestData.js";
import prisma from "../../../../prisma/client.js";

class UserRepository {
  private seeded = false;
  private useDatabase = Boolean(process.env.DB_URL);
  private users: User[] = [...usersTestData];

  private async ensureSeeded(): Promise<void> {
    if (this.seeded) return;

    if (!this.useDatabase) {
      this.seeded = true;
      return;
    }

    try {
      const existingCount = await prisma.user.count();
      if (existingCount === 0) {
        await prisma.user.createMany({ data: usersTestData });
      }
    } catch {
      this.useDatabase = false;
    }

    this.seeded = true;
  }

  async getAll(): Promise<User[]> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      return structuredClone(this.users).sort((a, b) => a.username.localeCompare(b.username));
    }
    return prisma.user.findMany({ orderBy: { username: "asc" } });
  }

  async getById(id: string): Promise<User | null> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      const found = this.users.find((u) => u.id === id) ?? null;
      return found ? { ...found } : null;
    }
    return prisma.user.findUnique({ where: { id } });
  }

  async create(newUser: NewUser): Promise<User> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      const created: User = {
        id: crypto.randomUUID?.() ?? `id_${Date.now()}`,
        ...newUser,
      };
      this.users.push(created);
      return { ...created };
    }
    return prisma.user.create({ data: newUser });
  }

  async delete(id: string): Promise<boolean> {
    await this.ensureSeeded();
    if (!this.useDatabase) {
      const initialLength = this.users.length;
      this.users = this.users.filter((u) => u.id !== id);
      return this.users.length < initialLength;
    }
    const result = await prisma.user.deleteMany({ where: { id } });
    return result.count > 0;
  }
}

export const userRepository = new UserRepository();
