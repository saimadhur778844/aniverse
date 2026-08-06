"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  SortState,
} from "./types";

export function useDataTable<T>(
  data: T[]
) {
  const [
    sort,
    setSort,
  ] = useState<SortState>({
    column: null,
    direction: "asc",
  });

  const sortedData =
    useMemo(() => {
      if (!sort.column)
        return data;

      return [...data].sort(
        (a, b) => {
          const first =
            a[
              sort.column as keyof T
            ];

          const second =
            b[
              sort.column as keyof T
            ];

          if (
            first == null ||
            second == null
          )
            return 0;

          if (first < second)
            return sort.direction ===
              "asc"
              ? -1
              : 1;

          if (first > second)
            return sort.direction ===
              "asc"
              ? 1
              : -1;

          return 0;
        }
      );
    }, [data, sort]);

  const toggleSort = (
    column: string
  ) => {
    setSort((previous) => ({
      column,

      direction:
        previous.column ===
          column &&
        previous.direction ===
          "asc"
          ? "desc"
          : "asc",
    }));
  };

  return {
    data: sortedData,

    sort,

    toggleSort,
  };
}