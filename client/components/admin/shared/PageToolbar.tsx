"use client";

import { Search, RefreshCw, Plus } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onRefresh?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function PageToolbar({
  search,
  onSearchChange,
  onRefresh,
  primaryAction,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-[#171726] p-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-3 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-10 pr-4 outline-none transition focus:border-pink-500"
        />

      </div>

      <div className="flex gap-3">

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        )}

        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 hover:bg-pink-500"
          >
            <Plus size={18} />
            {primaryAction.label}
          </button>
        )}

      </div>

    </div>
  );
}