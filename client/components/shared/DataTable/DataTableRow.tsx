import clsx from "clsx";

import DataTableCell from "./DataTableCell";

import { Column } from "./types";

interface Props<T> {
  row: T;

  columns: Column<T>[];

  index: number;

  striped: boolean;

  hover: boolean;

  compact: boolean;

  onClick?: (
    row: T
  ) => void;
}

export default function DataTableRow<T>({
  row,
  columns,
  index,
  striped,
  hover,
  compact,
  onClick,
}: Props<T>) {
  return (
    <tr
      onClick={() =>
        onClick?.(row)
      }
      className={clsx(
        striped &&
          index % 2 === 0 &&
          "bg-zinc-900",

        striped &&
          index % 2 === 1 &&
          "bg-zinc-950/40",

        hover &&
          "hover:bg-zinc-800/40",

        onClick &&
          "cursor-pointer"
      )}
    >
      {columns.map(
        (column) => (
<DataTableCell
  key={column.id}
  row={row}
  column={column}
  compact={compact}
  index={index}
/>
        )
      )}
    </tr>
  );
}