"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import authService from "@/services/authService";

export type Role =
  | "user"
  | "employee"
  | "admin"
  | "superadmin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;

  permissions?: string[];
};

export type AuthContextType = {
  user: User | null;

  token: string | null;

  loading: boolean;

  isAuthenticated: boolean;

  isAdmin: boolean;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;

  hasRole: (
    ...roles: Role[]
  ) => boolean;

  hasPermission: (
    permission: string
  ) => boolean;

  can: (
    permission: string
  ) => boolean;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const logout = useCallback(async () => {
    authService.logout();

    setUser(null);

    setToken(null);
  }, []);

  const refreshUser =
    useCallback(async () => {
      try {
        const storedToken =
          authService.getToken();

        if (!storedToken) {
          setUser(null);

          setToken(null);

          return;
        }

        setToken(storedToken);

        const currentUser =
          await authService.getProfile();

        setUser(currentUser);
      } catch (error) {
        console.error(
          "Failed to refresh user:",
          error
        );

        await logout();
      } finally {
        setLoading(false);
      }
    }, [logout]);

  useEffect(() => {
    const storedToken =
      authService.getToken();

    const storedUser =
      authService.getStoredUser();

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(storedUser);
    }

    refreshUser();
  }, [refreshUser]);

  const login = (
    jwt: string,
    userData: User
  ) => {
    localStorage.setItem(
      "token",
      jwt
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(jwt);

    setUser(userData);
  };

  const hasRole = (
    ...roles: Role[]
  ) => {
    if (!user) return false;

    return roles.includes(
      user.role
    );
  };

  const hasPermission = (
    permission: string
  ) => {
    if (!user) return false;

    if (
      user.role === "superadmin"
    ) {
      return true;
    }

    return (
      user.permissions?.includes(
        permission
      ) ?? false
    );
  };

  const can = (
    permission: string
  ) => {
    if (!user) return false;

    if (
      user.role === "admin" ||
      user.role === "superadmin"
    ) {
      return true;
    }

    return hasPermission(
      permission
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        loading,

        isAuthenticated:
          !!user && !!token,

        isAdmin:
          user?.role === "admin" ||
          user?.role ===
            "superadmin",

        login,

        logout,

        refreshUser,

        hasRole,

        hasPermission,

        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}