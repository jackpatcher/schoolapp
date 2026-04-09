
import React, { createContext, useContext, useState, useCallback } from "react";
import { Role } from "@/shared/models/roles";
export type { Role } from "@/shared/models/roles";
import { demoUsers, DemoUser } from "@/shared/models/demoUsers";

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role, username: string, password: string) => boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: Role, username: string, password: string) => {
    const found = demoUsers.find(u => u.role === role && u.username === username && u.password === password);
    if (found) {
      setUser({
        id: Date.now().toString(),
        username: found.username,
        role: found.role,
        name: found.name,
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
