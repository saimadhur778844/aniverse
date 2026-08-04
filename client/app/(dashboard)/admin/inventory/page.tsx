"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/admin/shared/PageHeader";
import InventoryStats from "@/components/admin/inventory/InventoryStats";
import InventoryFilters from "@/components/admin/inventory/InventoryFilters";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

import inventoryService from "@/services/inventoryService";

import type {
  InventoryAnalytics,
  InventoryProduct,
} from "@/types/inventory";

export default function InventoryPage() {
  const [analytics, setAnalytics] =
    useState<InventoryAnalytics | null>(null);

  const [products, setProducts] = useState<InventoryProduct[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [lowStock, setLowStock] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [search, lowStock]);

  async function loadAnalytics() {
    const data = await inventoryService.getAnalytics();
    setAnalytics(data);
  }

  async function loadProducts() {
    try {
      setLoading(true);

      const result =
        await inventoryService.getInventory({
          search,
          lowStock,
        });

      setProducts(result.products);
    } finally {
      setLoading(false);
    }
  }

  if (!analytics) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
          <span>Loading inventory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Inventory"
        description="Manage inventory, stock levels and warehouse items."
      />

      <InventoryStats analytics={analytics} />

      <InventoryFilters
        search={search}
        lowStock={lowStock}
        onSearchChange={setSearch}
        onLowStockChange={setLowStock}
      />

      <InventoryTable
        products={products}
        loading={loading}
        onAdjust={(product) => {
          console.log("Adjust stock:", product);
        }}
      />

    </div>
  );
}