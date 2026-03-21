import userRepository from "../repositories/UserRepository";
import type { User, NewUser } from "../types/User";

export async function login(username: string, email: string, password: string): Promise<User | null> {
  const users = await userRepository.getAll();
  const found = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.email.toLowerCase() === email.toLowerCase() && u.password === password) ?? null;
  return found;
}

export async function register(newUser: NewUser): Promise<User> {
  // Basic validation can go here later
  return userRepository.create(newUser);
}

export async function getSavedUsers(): Promise<User[]> {
  return userRepository.getAll();
}

export async function removeUser(id: string): Promise<boolean> {
  return userRepository.delete(id);
}
