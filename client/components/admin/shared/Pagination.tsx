"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  pages,
  onChange,
}: Props) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#171726] p-4">

      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`h-10 w-10 rounded-lg transition ${
              page === p
                ? "bg-pink-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>

    </div>
  );
}