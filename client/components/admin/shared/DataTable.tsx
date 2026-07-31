"use client";

import { ReactNode } from "react";

interface DataTableProps<T> {
  columns: string[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  renderRow: (item: T) => ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data found.",
  renderRow,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#171726] p-12 text-center text-zinc-400">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#171726] p-12 text-center text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171726]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{data.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  );
}