"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { productService } from "@/services/productService";
import { Product } from "@/types/product";

import Section from "@/components/store/Section";
import ProductGallery from "@/components/store/ProductGallery";
import ProductInfo from "@/components/store/ProductInfo";

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const response = await productService.getProduct(
          params.slug as string
        );

        setProduct(response.product);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.slug]);

  if (loading) return <Section>Loading...</Section>;

  if (error) return <Section>{error}</Section>;

  if (!product) return <Section>Product not found.</Section>;

  return (
    <Section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
        }}
      >
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>
    </Section>
  );
}