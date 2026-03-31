import type { User, NewUser } from "../types/User";

type ErrorResponseJSON = { error?: string };

// Build the API endpoint URL from environment variable or use relative path for local dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
const AUTH_ENDPOINT = `${API_BASE_URL}/api/v1/auth`;

async function assertResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body: ErrorResponseJSON = await res.json().catch(() => ({}));
    throw new Error(body.error || "Request failed");
  }
  return res.json();
}

export async function login(username: string, email: string, password: string): Promise<User | null> {
  const res = await fetch(`${AUTH_ENDPOINT}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (res.status === 401) return null;
  return assertResponse<User>(res);
}

export async function register(newUser: NewUser): Promise<User> {
  const res = await fetch(`${AUTH_ENDPOINT}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  return assertResponse<User>(res);
}

export async function getAll(): Promise<User[]> {
  const res = await fetch(`${AUTH_ENDPOINT}/users`);
  return assertResponse<User[]>(res);
}

export async function removeById(id: string): Promise<boolean> {
  const res = await fetch(`${AUTH_ENDPOINT}/users/${id}`, { method: "DELETE" });

  if (res.status === 204) return true;
  if (res.status === 404) return false;

  await assertResponse(res);
  return false;
}
