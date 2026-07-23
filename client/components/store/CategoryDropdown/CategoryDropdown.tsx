"use client";

import { Category } from "@/types/category";
import styles from "./CategoryDropdown.module.css";

interface CategoryDropdownProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryDropdown({
  categories = [],
  value,
  onChange,
}: CategoryDropdownProps) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option
          key={category._id}
          value={category.slug ?? category._id}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}