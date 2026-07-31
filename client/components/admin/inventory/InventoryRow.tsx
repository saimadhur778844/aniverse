"use client";

import Image from "next/image";
import { Pencil, History } from "lucide-react";

import StockStatusBadge from "./StockStatusBadge";

import type { InventoryProduct } from "@/types/inventory";

interface Props {
  product: InventoryProduct;
  onAdjust: (product: InventoryProduct) => void;
}

export default function InventoryRow({
  product,
  onAdjust,
}: Props) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/60 transition-colors">

      <td className="p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />
      </td>

      <td className="p-4 font-mono text-xs text-zinc-400">
        {product.sku || "-"}
      </td>

      <td className="p-4">
        <p className="font-medium text-white">
          {product.name}
        </p>

        <p className="text-xs text-zinc-500">
          {product.anime}
        </p>
      </td>

      <td className="p-4">
        {product.category?.name || "-"}
      </td>

      <td className="p-4">
        ₹{product.purchasePrice}
      </td>

      <td className="p-4">
        ₹{product.price}
      </td>

      <td className="p-4 text-emerald-400 font-medium">
        ₹{product.profit}
      </td>

      <td className="p-4">
        {product.stock}
      </td>

      <td className="p-4">
        {product.reservedStock}
      </td>

      <td className="p-4 font-medium">
        {product.availableStock}
      </td>

      <td className="p-4">
        <StockStatusBadge
          stock={product.stock}
          minimumStock={product.minimumStock}
        />
      </td>

      <td className="p-4">
        <div className="flex gap-2">

          <button
            onClick={() => onAdjust(product)}
            className="rounded-lg bg-pink-600 p-2 hover:bg-pink-500"
            title="Adjust Stock"
          >
            <Pencil size={16} />
          </button>

          <button
            className="rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700"
            title="History"
          >
            <History size={16} />
          </button>

        </div>
      </td>

    </tr>
  );
}