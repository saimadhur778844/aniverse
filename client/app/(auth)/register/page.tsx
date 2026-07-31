"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./Register.module.css";

import TextField from "@/components/shared/TextField/TextField";
import PasswordField from "@/components/auth/PasswordField/PasswordField";
import PasswordStrength from "@/components/auth/PasswordStrength/PasswordStrength";
import LoadingButton from "@/components/auth/LoadingButton/LoadingButton";
import TermsCheckbox from "@/components/auth/TermsCheckbox/TermsCheckbox";

import {
  registerSchema,
  RegisterForm,
} from "@/lib/validators/auth";

import authService from "@/services/authService";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function RegisterPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (
    values: RegisterForm
  ) => {
    setServerError("");

    try {
        const response = await authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
        });

      login(
        response.token,
        response.user
      );

      router.push("/");
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message ??
          "Registration failed."
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
          Join Aniverse
        </h1>

        <p className={styles.subtitle}>
          Create your account and
          start collecting your
          favourite anime
          merchandise.
        </p>

        {serverError && (
          <div className={styles.serverError}>
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className={styles.form}
        >
          <TextField
            label="Full Name"
            placeholder="Enter your name"
            autoComplete="name"
            required
            {...register("name")}
            error={
              errors.name?.message
            }
          />

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
            placeholder="Create a password"
            autoComplete="new-password"
            required
            {...register("password")}
            error={
              errors.password?.message
            }
          />

          <PasswordStrength
            password={password}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            {...register(
              "confirmPassword"
            )}
            error={
              errors
                .confirmPassword
                ?.message
            }
          />

          <TermsCheckbox
            {...register("terms")}
            error={
              errors.terms?.message
            }
          />

          <LoadingButton
            loading={isSubmitting}
            type="submit"
          >
            Create Account
          </LoadingButton>

          <div className={styles.footer}>
            Already have an account?{" "}
            <Link href="/login">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}