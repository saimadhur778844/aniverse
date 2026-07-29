"use client";

import styles from "./OrderFilters.module.css";

const FILTERS = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderFilter =
  (typeof FILTERS)[number];

interface OrderFiltersProps {
  value: OrderFilter;
  onChange: (value: OrderFilter) => void;
}

export default function OrderFilters({
  value,
  onChange,
}: OrderFiltersProps) {
  return (
    <div className={styles.filters}>
      {FILTERS.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          className={
            value === status ? styles.active : ""
          }
        >
          {status.charAt(0).toUpperCase() +
            status.slice(1)}
        </button>
      ))}
    </div>
  );
}