"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  columns: {
    id: string;
    header: React.ReactNode;
  }[];

  visibleColumns: string[];

  setVisibleColumns: Dispatch<
    SetStateAction<string[]>
  >;
}

export default function DataTableColumnToggle({
  columns,
  visibleColumns,
  setVisibleColumns,
}: Props) {
  const toggleColumn = (
    id: string
  ) => {
    setVisibleColumns((previous) =>
      previous.includes(id)
        ? previous.filter(
            (column) =>
              column !== id
          )
        : [...previous, id]
    );
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Visible Columns
      </h3>

      <div className="space-y-2">
        {columns.map((column) => (
          <label
            key={column.id}
            className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300"
          >
            <input
              type="checkbox"
              checked={visibleColumns.includes(
                column.id
              )}
              onChange={() =>
                toggleColumn(
                  column.id
                )
              }
            />

            {column.header}
          </label>
        ))}
      </div>
    </div>
  );
}