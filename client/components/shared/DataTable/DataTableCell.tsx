import clsx from "clsx";

import { Column } from "./types";
import { getCellValue } from "./utils";

interface Props<T> {
  row: T;

  column: Column<T>;

  compact: boolean;

  index: number;
}

export default function DataTableCell<T>({
  row,
  column,
  compact,
  index,
}: Props<T>) {
  return (
    <td
      className={clsx(
        compact ? "px-4 py-3" : "px-6 py-4",

        "border-b border-zinc-800 text-sm text-zinc-200",

        column.align === "center" && "text-center",

        column.align === "right" && "text-right",

        column.hideOnMobile && "hidden md:table-cell",

        column.className
      )}
    >
      {column.cell
        ? column.cell(row, index)
        : getCellValue(row, column.accessor)}
    </td>
  );
}