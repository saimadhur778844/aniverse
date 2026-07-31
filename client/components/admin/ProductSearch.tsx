"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
      <div className="relative">

        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

        <input
          type="text"
          value={value}
          placeholder="Search by product name or anime..."
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-11 pr-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
        />
      </div>
    </div>
  );
}