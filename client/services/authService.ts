import api from "@/lib/axios";
import type {
  LoginForm,
  RegisterForm,
} from "@/lib/validations/auth";
import type { User } from "@/context/AuthContext/AuthContext";

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

interface ProfileResponse {
  success: boolean;
  user: User;
}

export const login = async (
  payload: LoginForm
): Promise<AuthResponse> => {
  const { data } = await api.post(
    "/auth/login",
    payload
  );

  return data;
};

export const register = async (
  payload: Pick<
    RegisterForm,
    "name" | "email" | "password"
  >
): Promise<AuthResponse> => {
  const { data } = await api.post(
    "/auth/register",
    payload
  );

  return data;
};

export const getProfile =
  async (): Promise<ProfileResponse> => {
    const { data } = await api.get(
      "/auth/profile"
    );

    return data;
  };

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};