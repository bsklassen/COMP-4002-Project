import * as userRepository from "../apis/UserRepository";
import type { User, NewUser } from "../types/User";

export async function login(username: string, email: string, password: string): Promise<User | null> {
  return userRepository.login(username, email, password);
}

export async function register(newUser: NewUser): Promise<User> {
  return userRepository.register(newUser);
}

export async function getSavedUsers(): Promise<User[]> {
  return userRepository.getAll();
}

export async function removeUser(id: string): Promise<boolean> {
  return userRepository.removeById(id);
}
