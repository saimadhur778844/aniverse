"use client";

import SearchBar from "../SearchBar";
import CategoryDropdown from "../CategoryDropdown";
import SortDropdown from "../SortDropdown";

import { Category } from "@/types/category";

import styles from "./ProductToolbar.module.css";

interface ProductToolbarProps {
  total: number;

  search: string;
  onSearch: (value: string) => void;

  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
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
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <span>
          {total} Product{total !== 1 ? "s" : ""}
        </span>
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
    </div>
  );
}