import DataTableRow from "./DataTableRow";
import DataTableSkeleton from "./DataTableSkeleton";
import DataTableEmpty from "./DataTableEmpty";

import { Column } from "./types";

interface Props<T> {
  columns: Column<T>[];

  data: T[];

  loading: boolean;

  rowKey: keyof T;

  striped: boolean;

  hover: boolean;

  compact: boolean;

  emptyMessage: string;

  onRowClick?: (
    row: T
  ) => void;
}

export default function DataTableBody<T>({
  columns,
  data,
  loading,
  rowKey,
  striped,
  hover,
  compact,
  emptyMessage,
  onRowClick,
}: Props<T>) {
  if (loading) {
    return (
      <DataTableSkeleton
        columns={
          columns.length
        }
      />
    );
  }

  if (data.length === 0) {
    return (
      <DataTableEmpty
        columns={
          columns.length
        }
        message={emptyMessage}
      />
    );
  }

  return (
    <tbody>
      {data.map(
        (
          row,
          index
        ) => (
          <DataTableRow
            key={String(
              row[rowKey]
            )}
            row={row}
            columns={columns}
            striped={striped}
            hover={hover}
            compact={compact}
            index={index}
            onClick={
              onRowClick
            }
          />
        )
      )}
    </tbody>
  );
}