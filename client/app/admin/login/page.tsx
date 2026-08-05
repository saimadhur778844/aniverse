"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { notify } from "@/utils/toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await authService.login({
        email,
        password,
      });

      login(response.token, response.user);

      router.push("/admin/dashboard");
    } catch (error: any) {
      notify.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 400,
        margin: "100px auto",
      }}
    >
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}