import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  /* Rahman's section */
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  /* Rahman's section */
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}