"use client";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ProductToolbar({
  search,
  onSearchChange,
}: ProductToolbarProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

      </div>
    </div>
  );
}