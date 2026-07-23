import Link from "next/link";
import Image from "next/image";

import Card from "@/components/shared/Card";

import { Category } from "@/types/category";

import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug ?? category._id}`}
      className={styles.link}
    >
      <Card hover className={styles.card}>
        <div className={styles.imageContainer}>
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>📦</div>
          )}
        </div>

        <div className={styles.content}>
          <h3>{category.name}</h3>

          {category.description && (
            <p>{category.description}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}