"use client";

import styles from "./SortDropdown.module.css";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "name";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className={styles.container}>
      <label
        htmlFor="sort-products"
        className={styles.label}
      >
        Sort By
      </label>

      <div className={styles.selectWrapper}>
        <select
          id="sort-products"
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value as SortOption
            )
          }
          className={styles.select}
        >
          <option value="featured">
            Featured
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="price-asc">
            Price: Low → High
          </option>

          <option value="price-desc">
            Price: High → Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="name">
            Name (A–Z)
          </option>
        </select>

        <span
          className={styles.arrow}
          aria-hidden="true"
        >
          ▼
        </span>
      </div>
    </div>
  );
}