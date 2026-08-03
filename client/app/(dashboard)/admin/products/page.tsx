"use client";

import { useCallback, useEffect, useState } from "react";

import productService from "@/services/productService";

import { Product } from "@/types/product";

import ProductModal from "@/components/admin/ProductModal/ProductModal";
import ProductSearch from "@/components/admin/ProductSearch";
import ProductStats from "@/components/admin/ProductStats";
import ProductTable from "@/components/admin/ProductTable";
import { notify } from "@/utils/toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await productService.getProducts({
          search:
            debouncedSearch || undefined,
          page: 1,
          limit: 100,
        });

      setProducts(response.products);
    } catch (error) {
      console.error(
        "Failed to load products",
        error
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    try {
      await productService.deleteProduct(id);

      await loadProducts();

      notify.success("Product deleted.");
    } catch (error) {
      console.error(error);

      notify.error("Failed to delete product.");
    }
  };

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Products
            </h1>

            <p className="text-gray-500">
              Manage your product catalogue
            </p>

          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setShowModal(true);
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Add Product
          </button>

        </div>

        <ProductStats
          products={products}
        />

        <ProductSearch
          value={search}
          onChange={setSearch}
        />

        <ProductTable
          products={products}
          loading={loading}
          onEdit={(product) => {
            setSelectedProduct(product);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
                <ProductModal
          open={showModal}
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={async () => {
            await loadProducts();

            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    </>
  );
}