"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Product } from "@/types/product";
import { productService } from "@/services/productService";

import Section from "../Section";
import SectionHeader from "../SectionHeader";
import ProductGrid from "../ProductGrid";

import styles from "./RelatedProducts.module.css";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({
  currentProduct,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = useMemo(() => {
    return typeof currentProduct.category === "string"
      ? currentProduct.category
      : currentProduct.category._id;
  }, [currentProduct.category]);

  const loadProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response =
        await productService.getProducts({
          category,
          limit: 5,
        });

      const related = response.products
        .filter(
          (product) =>
            product._id !== currentProduct._id
        )
        .slice(0, 4);

      setProducts(related);
    } catch (error) {
      console.error(
        "Failed to load related products",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [category, currentProduct._id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <Section className={styles.container}>
      <SectionHeader
        title="Related Products"
        subtitle="You may also like these collectibles."
      />

      {loading ? (
        <div className={styles.loading}>
          Loading recommendations...
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </Section>
  );
}