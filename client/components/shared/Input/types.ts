import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

export interface BaseInputProps {
  label?: string;

  error?: string;

  helperText?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseInputProps {}