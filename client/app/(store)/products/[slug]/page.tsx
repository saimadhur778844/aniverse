"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import productService from "@/services/productService";
import { Product } from "@/types/product";

import Section from "@/components/store/Section";
import Breadcrumb from "@/components/store/Breadcrumb";
import ProductGallery from "@/components/store/ProductGallery";
import ProductInfo from "@/components/store/ProductInfo";

import styles from "./page.module.css";

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const product = await productService.getProduct(
          params.slug as string
        );

        if (mounted) {
          setProduct(product);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError("Failed to load product.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [params.slug]);

  const category =
    !product
      ? ""
      : typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "";

  if (loading) {
    return (
      <Section>
        <div className="space-y-6">
          <div className="skeleton h-10 w-48 rounded-full" />
          <div className={styles.layout}>
            <div className="space-y-4">
              <div className="skeleton h-96 w-full rounded-3xl" />
              <div className="skeleton h-20 w-full rounded-2xl" />
            </div>
            <div className="space-y-4">
              <div className="skeleton h-8 w-32 rounded-full" />
              <div className="skeleton h-12 w-3/4 rounded-full" />
              <div className="skeleton h-24 w-full rounded-2xl" />
              <div className="skeleton h-14 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <p>{error}</p>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section>
        <p>Product not found.</p>
      </Section>
    );
  }

  return (
    <Section>
      <Breadcrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Products",
            href: "/products",
          },
          {
            label: category,
          },
          {
            label: product.name,
          },
        ]}
      />

      <div className={styles.layout}>
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </Section>
  );
}