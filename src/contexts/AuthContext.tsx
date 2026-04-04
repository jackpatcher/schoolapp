import React, { createContext, useContext, useState, useCallback } from "react";

export type Role = "teacher" | "student" | "parent" | "admin";

interface User {
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

const demoCredentials: Record<Role, { username: string; password: string }> = {
  teacher: { username: "teacher", password: "pass123" },
  student: { username: "student", password: "pass123" },
  parent: { username: "parent", password: "pass123" },
  admin: { username: "admin", password: "pass123" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: Role, username: string, password: string) => {
    const creds = demoCredentials[role];
    if (username === creds.username && password === creds.password) {
      setUser({
        id: Date.now().toString(),
        username,
        role,
        name: role.charAt(0).toUpperCase() + role.slice(1),
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
