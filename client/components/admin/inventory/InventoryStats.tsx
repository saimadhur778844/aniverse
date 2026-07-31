"use client";

import {
  Boxes,
  AlertTriangle,
  PackageX,
  Truck,
} from "lucide-react";

import StatCard from "../shared/StatCard";

import type {
  InventoryAnalytics,
} from "@/types/inventory";

interface Props {
  analytics: InventoryAnalytics;
}

export default function InventoryStats({
  analytics,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Inventory Value"
        value={`₹${analytics.inventoryValue.toLocaleString()}`}
        icon={<Boxes size={28} />}
        color="purple"
      />

      <StatCard
        title="Low Stock"
        value={analytics.lowStock}
        icon={<AlertTriangle size={28} />}
        color="orange"
      />

      <StatCard
        title="Out Of Stock"
        value={analytics.outOfStock}
        icon={<PackageX size={28} />}
        color="pink"
      />

      <StatCard
        title="Incoming"
        value={analytics.incoming}
        icon={<Truck size={28} />}
        color="green"
      />

    </div>
  );
}