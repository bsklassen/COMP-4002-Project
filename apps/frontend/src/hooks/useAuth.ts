import { useCallback, useEffect, useState } from "react";
import * as authService from "../services/authService";
import type { User, NewUser } from "../types/User";

/**
 * useAuth hook
 * What: Provides `login`, `signup`, `savedUsers`, and user-management helpers.
 * Why: Keeps auth UI logic simple by delegating persistence and business logic
 *      to `authService` and ultimately the `UserRepository`.
 * How used: Components call the hook to perform auth actions without
 *           directly touching repository or test data.
 */
export default function useAuth() {
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshSaved = useCallback(async () => {
    setLoading(true);
    try {
      const users = await authService.getSavedUsers();
      setSavedUsers(users);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSaved();
  }, [refreshSaved]);

  const login = useCallback(async (username: string, email: string, password: string) => {
    return authService.login(username, email, password);
  }, []);

  const signup = useCallback(async (newUser: NewUser) => {
    const created = await authService.register(newUser);
    // refresh local cache
    await refreshSaved();
    return created;
  }, [refreshSaved]);

  const remove = useCallback(async (id: string) => {
    const deleted = await authService.removeUser(id);
    if (deleted) await refreshSaved();
    return deleted;
  }, [refreshSaved]);

  return {
    savedUsers,
    loading,
    refreshSaved,
    login,
    signup,
    remove,
  } as const;
}
