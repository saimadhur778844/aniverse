"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types/product";
import { productService } from "@/services/productService";

import SectionHeader from "../SectionHeader";
import ProductGrid from "../ProductGrid";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({
  currentProduct,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, [currentProduct]);

  const loadProducts = async () => {
    try {
      const category =
        typeof currentProduct.category === "string"
          ? currentProduct.category
          : currentProduct.category._id;

      const response = await productService.getProducts({
        category,
        limit: 4,
      });

      const related = response.products.filter(
        (product) => product._id !== currentProduct._id
      );

      setProducts(related.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  };

  if (products.length === 0) return null;

  return (
    <>
      <SectionHeader
        title="Related Products"
        subtitle="You may also like these collectibles."
      />

      <ProductGrid products={products} />
    </>
  );
}