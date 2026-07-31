"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  lowStock: boolean;
  onSearchChange: (value: string) => void;
  onLowStockChange: (value: boolean) => void;
}

export default function InventoryFilters({
  search,
  lowStock,
  onSearchChange,
  onLowStockChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171726] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

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
            placeholder="Search product, SKU or anime..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-10 pr-4 text-white outline-none transition focus:border-pink-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={lowStock}
            onChange={(e) =>
              onLowStockChange(e.target.checked)
            }
            className="h-4 w-4 rounded border-zinc-600 accent-pink-500"
          />
          Show Low Stock Only
        </label>

      </div>
    </div>
  );
}