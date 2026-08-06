"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;

  onChange(value: string): void;

  placeholder?: string;
}

export default function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative w-full max-w-md">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-2.5 pl-10 pr-10 text-white outline-none transition focus:border-pink-500"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          <X size={16} />
        </button>
      )}

    </div>
  );
}