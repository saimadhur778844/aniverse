"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Section from "../Section";
import SectionHeader from "../SectionHeader";
import ProductGrid from "../ProductGrid";
import ProductGridSkeleton from "../ProductGridSkeleton";
import Button from "@/components/shared/Button";

import productService from "@/services/productService";
import { Product } from "@/types/product";

import styles from "./FeaturedSection.module.css";

export default function FeaturedSection() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadFeaturedProducts =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await productService.getProducts({
            featured: true,
            limit: 8,
          });

        setProducts(response.products);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load featured products."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;

      await loadFeaturedProducts();
    };

    load();

    return () => {
      mounted = false;
    };
  }, [loadFeaturedProducts]);

  return (
    <Section className={styles.section}>
      <SectionHeader
        title="Featured Products"
        subtitle="Discover our hand-picked anime collectibles."
        viewAllHref="/products"
      />

      {loading && (
        <div
          className={styles.state}
          aria-live="polite"
        >
          <ProductGridSkeleton count={4} />
        </div>
      )}

      {!loading && error && (
        <div className={styles.state}>
          <p>{error}</p>

          <Button
            variant="primary"
            onClick={
              loadFeaturedProducts
            }
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading &&
        !error &&
        products.length > 0 && (
          <ProductGrid
            products={products}
          />
        )}

      {!loading &&
        !error &&
        products.length === 0 && (
          <div className={styles.state}>
            <p>
              No featured products
              available.
            </p>
          </div>
        )}
    </Section>
  );
}