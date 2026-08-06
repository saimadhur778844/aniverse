import { ReactNode } from "react";

export type SortDirection =
  | "asc"
  | "desc";

export interface Column<T> {
  id: string;

  header: ReactNode;

  accessor?: keyof T;

  cell?: (
    row: T,
    index: number
  ) => ReactNode;

  width?: number | string;

  align?: "left" | "center" | "right";

  sortable?: boolean;

  hideOnMobile?: boolean;

  className?: string;
}

export interface SortState {
  column: string | null;

  direction: SortDirection;
}

export interface DataTableProps<T> {
  columns: Column<T>[];

  data: T[];

  loading?: boolean;

  emptyMessage?: string;

  rowKey: keyof T;

  stickyHeader?: boolean;

  striped?: boolean;

  hover?: boolean;

  compact?: boolean;

  onRowClick?: (
    row: T
  ) => void;

  className?: string;
}