"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "./Input";
import { InputProps } from "./types";

const PasswordInput = forwardRef<
  HTMLInputElement,
  InputProps
>((props, ref) => {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <Input
      ref={ref}
      {...props}
      type={
        showPassword
          ? "text"
          : "password"
      }
      rightIcon={
        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="cursor-pointer text-zinc-400 hover:text-white"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      }
    />
  );
});

PasswordInput.displayName =
  "PasswordInput";

export default PasswordInput;