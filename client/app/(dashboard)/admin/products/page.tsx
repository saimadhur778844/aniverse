"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductStats from "@/components/admin/ProductStats";
import ProductTable from "@/components/admin/ProductTable";
import ProductFilters from "@/components/admin/ProductFilters";

import Button from "@/components/shared/Button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Pagination from "@/components/shared/Pagination";

import {
  useDeleteProduct,
  useProducts,
} from "@/hooks/products";

import type {
  Product,
  ProductFilters as ProductFiltersType,
} from "@/types/product";

export default function ProductsPage() {
  const router = useRouter();

  const [filters, setFilters] =
    useState<ProductFiltersType>({
      search: "",
      category: "",
      anime: "",
      status: "",
      featured: "",
      page: 1,
      limit: 20,
    });

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(
        filters.search ?? ""
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const queryFilters: ProductFiltersType = {
    ...filters,
    search:
      debouncedSearch || undefined,
  };

  const {
    data,
    isLoading,
  } = useProducts(queryFilters);

  const deleteMutation =
    useDeleteProduct();

  const products =
    data?.products ?? [];

  function updateFilter(
    key: keyof ProductFiltersType,
    value: string | number
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  }

  return (
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

        <Button
          onClick={() =>
            router.push(
              "/admin/products/new"
            )
          }
        >
          Add Product
        </Button>

      </div>

      <ProductStats
        products={products}
      />

      <ProductFilters
        search={filters.search ?? ""}
        category={
          filters.category ?? ""
        }
        anime={filters.anime ?? ""}
        status={filters.status ?? ""}
        featured={
          filters.featured ?? ""
        }
        onSearchChange={(v) =>
          updateFilter(
            "search",
            v
          )
        }
        onCategoryChange={(v) =>
          updateFilter(
            "category",
            v
          )
        }
        onAnimeChange={(v) =>
          updateFilter(
            "anime",
            v
          )
        }
        onStatusChange={(v) =>
          updateFilter(
            "status",
            v
          )
        }
        onFeaturedChange={(v) =>
          updateFilter(
            "featured",
            v
          )
        }
      />

      <ProductTable
        products={products}
        loading={isLoading}
        onEdit={(product) =>
          router.push(
            `/admin/products/${product._id}/edit`
          )
        }
        onDelete={(id) => {
          const product =
            products.find(
              (p) => p._id === id
            ) ?? null;

          setProductToDelete(
            product
          );
        }}
      />

      <Pagination
        page={
          data?.page ??
          filters.page ??
          1
        }
        pages={data?.pages ?? 1}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />

      <ConfirmDialog
        open={!!productToDelete}
        title="Delete Product"
        message={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"?`
            : ""
        }
        confirmText="Delete"
        loading={
          deleteMutation.isPending
        }
        onCancel={() =>
          setProductToDelete(
            null
          )
        }
        onConfirm={async () => {
          if (!productToDelete)
            return;

          await deleteMutation.mutateAsync(
            productToDelete._id
          );

          setProductToDelete(
            null
          );
        }}
      />

    </div>
  );
}