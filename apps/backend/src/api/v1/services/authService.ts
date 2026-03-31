import { userRepository } from "../repositories/UserRepository.js";
import type { User, NewUser } from "../types/User.js";

export async function login(username: string, email: string, password: string): Promise<User | null> {
  const users = await userRepository.getAll();
  const found = users.find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return found ?? null;
}

export async function register(newUser: NewUser): Promise<User> {
  const users = await userRepository.getAll();
  const existing = users.find(u => u.username.toLowerCase() === newUser.username.toLowerCase() || u.email.toLowerCase() === newUser.email.toLowerCase());
  if (existing) {
    throw new Error("User with this username or email already exists");
  }
  return userRepository.create(newUser);
}

export async function getSavedUsers(): Promise<User[]> {
  return userRepository.getAll();
}

export async function removeUser(id: string): Promise<boolean> {
  return userRepository.delete(id);
}
