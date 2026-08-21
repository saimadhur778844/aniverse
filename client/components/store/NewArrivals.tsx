"use client";

import { useEffect, useState } from "react";

import ProductGrid from "./ProductGrid";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Button from "@/components/shared/Button";

import productService from "@/services/productService";

import type { Product } from "@/types/product";

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await productService.getProducts({
          limit: 8,
          sort: "newest",
        });

        setProducts(
          Array.isArray(response?.products)
            ? response.products
            : []
        );
      } catch (err) {
        console.error("Failed to load new arrivals:", err);
        setProducts([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Section>
      <SectionHeader
        title="New Arrivals"
        subtitle="Freshly added collectibles."
      />

      {loading && (
        <div className="flex min-h-[220px] items-center justify-center">
          <p className="text-sm text-white/60">
            Loading new arrivals...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-4">
          <p className="text-sm text-white/60">
            Unable to load new arrivals.
          </p>

          <Button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid
        products={products}
        horizontalMobile
        />
      )}

      {!loading && !error && products.length === 0 && (
        <div className="flex min-h-[180px] items-center justify-center">
          <p className="text-sm text-white/50">
            New arrivals will appear here soon.
          </p>
        </div>
      )}
    </Section>
  );
}