"use client";

import type { InventoryProduct } from "@/types/inventory";

import InventoryRow from "./InventoryRow";

interface Props {
  products: InventoryProduct[];
  loading?: boolean;
  onAdjust: (product: InventoryProduct) => void;
}

export default function InventoryTable({
  products,
  loading = false,
  onAdjust,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#171726] p-10 text-center text-zinc-400">
        Loading inventory...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#171726] p-10 text-center text-zinc-500">
        No inventory found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171726]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="border-b border-zinc-800 bg-zinc-900">
            <tr className="text-left text-sm uppercase tracking-wide text-zinc-400">
              <th className="p-4">Image</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Price</th>
              <th className="p-4">Profit</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Reserved</th>
              <th className="p-4">Available</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <InventoryRow
                key={product._id}
                product={product}
                onAdjust={onAdjust}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}