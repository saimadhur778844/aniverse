"use client";

import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  productCount?: number;
}

export default function ProductToolbar({
  search,
  onSearchChange,
  productCount = 0,
}: ProductToolbarProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Search */}

        <div className="relative w-full max-w-lg">

          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by product, anime or category..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() =>
                onSearchChange("")
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

        </div>

        {/* Stats */}

        <div className="flex items-center justify-between gap-4">

          <div className="rounded-lg bg-indigo-50 px-4 py-2">

            <span className="text-sm font-medium text-indigo-700">
              Total Products
            </span>

            <p className="text-xl font-bold text-indigo-900">
              {productCount}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}