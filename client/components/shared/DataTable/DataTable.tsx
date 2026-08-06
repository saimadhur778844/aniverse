"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";

import { DataTableProps } from "./types";

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No records found.",
  rowKey,
  stickyHeader = true,
  striped = false,
  hover = true,
  compact = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={twMerge(
        clsx(
          "overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900",
          className
        )
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">

          <DataTableHeader
            columns={columns}
            sticky={stickyHeader}
          />

          <DataTableBody
            columns={columns}
            data={data}
            loading={loading}
            rowKey={rowKey}
            striped={striped}
            hover={hover}
            compact={compact}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
          />

        </table>
      </div>
    </div>
  );
}