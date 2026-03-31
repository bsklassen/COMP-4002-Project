import type { User, NewUser } from "../types/User.ts";
import userRepository from "../repositories/UserRepository";

/**
 * Auth Service
 * 
 * What: Service layer for authentication operations.
 * Why: Provides business logic for auth operations, delegating data persistence to UserRepository.
 * How: Wraps repository calls with auth-specific logic.
 */

export async function getSavedUsers(): Promise<User[]> {
  return userRepository.getAll();
}

export async function login(username: string, _email: string, password: string): Promise<User | null> {
  const users = await userRepository.getAll();
  const user = users.find(u => u.username === username && u.password === password);
  return user ?? null;
}

export async function register(newUser: NewUser): Promise<User> {
  return userRepository.create(newUser);
}

export async function removeUser(id: string): Promise<boolean> {
  return userRepository.delete(id);
}
