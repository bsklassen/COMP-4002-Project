import type { User, NewUser } from "../types/User.ts";
import { usersTestData } from "../data/usersTestData.ts";

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [...usersTestData];
  }

  async getAll(): Promise<User[]> {
    return structuredClone(this.users);
  }

  async getById(id: string): Promise<User | null> {
    const found = this.users.find(u => u.id === id) ?? null;
    return found ? { ...found } : null;
  }

  async create(newUser: NewUser): Promise<User> {
    const created: User = {
      id: crypto.randomUUID?.() ?? `id_${Date.now()}`,
      ...newUser,
    };
    this.users.push(created);
    return { ...created };
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }
}

export const userRepository = new UserRepository();
