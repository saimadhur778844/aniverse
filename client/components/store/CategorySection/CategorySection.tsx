"use client";

import { useEffect, useState } from "react";

import Section from "../Section";
import SectionHeader from "../SectionHeader";
import CategoryGrid from "../CategoryGrid";

import categoryService from "@/services/categoryService";
import { Category } from "@/types/category";

import styles from "./CategorySection.module.css";

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);

        const data = await categoryService.getCategories();

        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <Section>
        <SectionHeader
          title="Shop by Category"
          subtitle="Browse collectibles by category."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="skeleton h-36 w-full rounded-2xl"
            />
          ))}
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionHeader
          title="Shop by Category"
          subtitle="Browse collectibles by category."
        />

        <p>{error}</p>
      </Section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader
        title="Shop by Category"
        subtitle="Browse collectibles by category."
        viewAllHref="/products"
      />

      <CategoryGrid categories={categories} />
    </Section>
  );
}