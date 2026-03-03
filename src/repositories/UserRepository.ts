import type { User, NewUser } from "../types/User";
import { usersTestData } from "../data/usersTestData";

class UserRepository {
  private users: User[] = [];

  constructor() {
    // Initialize from test data (satisfies requirement of importing test data)
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
    const created: User = { id: crypto.randomUUID?.() ?? `id_${Date.now()}`, ...newUser };
    this.users.push(created);
    return { ...created };
  }

  async update(id: string, updates: Partial<NewUser>): Promise<User | null> {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    return { ...this.users[idx] };
  }

  async delete(id: string): Promise<boolean> {
    const initial = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initial;
  }
}

// Export a singleton repository instance
const userRepository = new UserRepository();
export default userRepository;
