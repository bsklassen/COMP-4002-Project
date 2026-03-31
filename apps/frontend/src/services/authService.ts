import * as UserRepository from "../apis/UserRepository";
import type { User, NewUser } from "../types/User";

export async function login(username: string, email: string, password: string): Promise<User | null> {
  return UserRepository.login(username, email, password);
}

export async function register(newUser: NewUser): Promise<User> {
  return UserRepository.register(newUser);
}

export async function getSavedUsers(): Promise<User[]> {
  const users = await UserRepository.getAll();
  return users;
}

export async function removeUser(id: string): Promise<boolean> {
  return UserRepository.removeById(id);
}
