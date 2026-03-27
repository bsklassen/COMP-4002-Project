import type { User, NewUser } from "../types/User";

const baseUrl = "/api/v1/auth";

async function assertResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).error || "Request failed");
  }
  return res.json();
}

export async function login(username: string, email: string, password: string): Promise<User | null> {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (res.status === 401) return null;
  return assertResponse<User>(res);
}

export async function register(newUser: NewUser): Promise<User> {
  const res = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return assertResponse<User>(res);
}

export async function getSavedUsers(): Promise<User[]> {
  const res = await fetch(`${baseUrl}/users`);
  return assertResponse<User[]>(res);
}

export async function removeUser(id: string): Promise<boolean> {
  const res = await fetch(`${baseUrl}/users/${id}`, { method: "DELETE" });
  if (res.status === 204) return true;
  if (res.status === 404) return false;
  await assertResponse(res);
  return false;
}
