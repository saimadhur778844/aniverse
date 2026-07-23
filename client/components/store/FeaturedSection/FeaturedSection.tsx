"use client";

import { useEffect, useState } from "react";

import Section from "../Section";
import SectionHeader from "../SectionHeader";
import ProductGrid from "../ProductGrid";

import { productService } from "@/services/productService";
import { Product } from "@/types/product";

import styles from "./FeaturedSection.module.css";

export default function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);

    const response = await productService.getProducts({
            featured: true,
            limit: 8,
        });

        setProducts(response.products);
      } catch (err) {
        console.error(err);
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <Section>
        <SectionHeader
          title="Featured Products"
          subtitle="Discover our hand-picked anime collectibles."
        />

        <p>Loading products...</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionHeader
          title="Featured Products"
          subtitle="Discover our hand-picked anime collectibles."
        />

        <p>{error}</p>
      </Section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeader
        title="Featured Products"
        subtitle="Discover our hand-picked anime collectibles."
        viewAllHref="/products"
      />

      <ProductGrid products={products} />
    </Section>
  );
}