"use client";

import SearchBar from "../SearchBar";
import CategoryDropdown from "../CategoryDropdown";
import SortDropdown, {
  SortOption,
} from "../SortDropdown";

import { Category } from "@/types/category";

import styles from "./ProductToolbar.module.css";

interface ProductToolbarProps {
  total: number;

  search: string;
  onSearch: (value: string) => void;

  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;

  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function ProductToolbar({
  total,
  search,
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <section
      className={styles.toolbar}
      aria-label="Product controls"
    >
      <div className={styles.left}>
        <h3 className={styles.count}>
          {total.toLocaleString()}{" "}
          Product
          {total !== 1 ? "s" : ""}
        </h3>

        <p className={styles.subtitle}>
          Browse our latest anime
          collectibles
        </p>
      </div>

      <div className={styles.right}>
        <SearchBar
          value={search}
          onSearch={onSearch}
        />

        <CategoryDropdown
          categories={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
        />

        <SortDropdown
          value={sort}
          onChange={onSortChange}
        />
      </div>
    </section>
  );
}