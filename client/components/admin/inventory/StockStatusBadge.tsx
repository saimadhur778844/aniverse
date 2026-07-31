"use client";

interface Props {
  stock: number;
  minimumStock: number;
}

export default function StockStatusBadge({
  stock,
  minimumStock,
}: Props) {
  if (stock === 0) {
    return (
      <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-medium text-red-400">
        Out of Stock
      </span>
    );
  }

  if (stock <= minimumStock) {
    return (
      <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-400">
        Low Stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
      Healthy
    </span>
  );
}