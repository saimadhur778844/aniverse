"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { Product } from "@/types/product";
import { Category } from "@/services/categoryService";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory, sort, page]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productService.getProducts({
        search: search || undefined,
        category: selectedCategory || undefined,
        sort,
        page,
        limit: 12,
      });

      setProducts(response.products);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    categories,
    loading,
    error,

    total,
    page,
    totalPages,

    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    sort,
    setSort,

    setPage,

    refreshProducts: loadProducts,
  };
}