"use client";

import {
  Search,
  X,
} from "lucide-react";

import Input from "./Input";

import { InputProps } from "./types";

interface SearchInputProps
  extends Omit<
    InputProps,
    "leftIcon" | "rightIcon"
  > {
  onClear?: () => void;
}

export default function SearchInput({
  value,

  onChange,

  onClear,

  ...props
}: SearchInputProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      leftIcon={
        <Search size={18} />
      }
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={
              onClear
            }
            className="text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        ) : null
      }
      placeholder="Search..."
      {...props}
    />
  );
}