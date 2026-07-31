"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./Login.module.css";

import TextField from "@/components/shared/TextField/TextField";
import PasswordField from "@/components/auth/PasswordField/PasswordField";
import LoadingButton from "@/components/auth/LoadingButton/LoadingButton";

import {
  loginSchema,
  LoginForm,
} from "@/lib/validators/auth";

import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: LoginForm
  ) => {
    setServerError("");

    try {
      const response = await authService.login(values);
      login(
        response.token,
        response.user
      );

      router.push("/");
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message ??
          "Login failed. Please try again."
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          🌸
        </div>

        <h1 className={styles.title}>
          Welcome Back
        </h1>

        <p className={styles.subtitle}>
          Sign in to continue your
          anime collection journey.
        </p>

        {serverError && (
          <div className={styles.serverError}>
            {serverError}
          </div>
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <TextField
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            {...register("email")}
            error={
              errors.email?.message
            }
          />

          <PasswordField
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            {...register("password")}
            error={
              errors.password?.message
            }
          />

          <div className={styles.actions}>
            <Link
              href="/forgot-password"
              className={styles.link}
            >
              Forgot Password?
            </Link>
          </div>

          <LoadingButton
            type="submit"
            loading={isSubmitting}
          >
            Sign In
          </LoadingButton>
        </form>

        <div className={styles.footer}>
          Don't have an account?{" "}
          <Link href="/register">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}