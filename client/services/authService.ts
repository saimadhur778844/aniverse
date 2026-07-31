import api from "./api";

import type {
  LoginForm,
  RegisterForm,
} from "@/lib/validators/auth";

import type { User } from "@/context/AuthContext/AuthContext";

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}

class AuthService {
  async login(
    payload: LoginForm
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/login",
      payload
    );

    this.persistAuth(data);

    return data;
  }

  async register(
    payload: Pick<
      RegisterForm,
      "name" | "email" | "password"
    >
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      payload
    );

    this.persistAuth(data);

    return data;
  }

  async getProfile(): Promise<User> {
    const { data } = await api.get<ProfileResponse>(
      "/auth/profile"
    );

    return data.user;
  }

  logout(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  }

  getStoredUser(): User | null {
    if (typeof window === "undefined") {
      return null;
    }

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private persistAuth(data: AuthResponse): void {
    if (typeof window === "undefined") return;

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }
}

const authService = new AuthService();

export default authService;