import clsx from "clsx";

import { Column } from "./types";

interface Props<T> {
  columns: Column<T>[];

  sticky: boolean;
}

export default function DataTableHeader<T>({
  columns,
  sticky,
}: Props<T>) {
  return (
    <thead
      className={clsx(
        "bg-zinc-950",
        sticky && "sticky top-0 z-10"
      )}
    >
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            style={{
              width: column.width,
            }}
            className={clsx(
              "border-b border-zinc-800 px-6 py-4 text-sm font-semibold text-zinc-300",

              column.align === "center" &&
                "text-center",

              column.align === "right" &&
                "text-right",

              column.align !== "center" &&
                column.align !== "right" &&
                "text-left",

              column.hideOnMobile &&
                "hidden md:table-cell",

              column.className
            )}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}