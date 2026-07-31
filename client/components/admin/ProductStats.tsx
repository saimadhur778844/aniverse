"use client";

import {
  CubeIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

import { Product } from "@/types/product";
import StatCard from "./statcard";

interface ProductStatsProps {
  products: Product[];
}

export default function ProductStats({
  products,
}: ProductStatsProps) {
  const totalProducts = products.length;

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Products"
        value={totalProducts}
        icon={<CubeIcon className="h-7 w-7" />}
      />

      <StatCard
        title="Featured"
        value={featuredProducts}
        icon={<StarIcon className="h-7 w-7" />}
        color="bg-yellow-100 text-yellow-700"
      />

      <StatCard
        title="Low Stock"
        value={lowStockProducts}
        icon={
          <ExclamationTriangleIcon className="h-7 w-7" />
        }
        color="bg-orange-100 text-orange-700"
      />

      <StatCard
        title="Out Of Stock"
        value={outOfStockProducts}
        icon={
          <ArchiveBoxXMarkIcon className="h-7 w-7" />
        }
        color="bg-red-100 text-red-700"
      />

    </div>
  );
}