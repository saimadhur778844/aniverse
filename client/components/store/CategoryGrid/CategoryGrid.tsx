import { Category } from "@/types/category";

import CategoryCard from "../CategoryCard";

import styles from "./CategoryGrid.module.css";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({
  categories,
}: CategoryGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
        />
      ))}
    </div>
  );
}