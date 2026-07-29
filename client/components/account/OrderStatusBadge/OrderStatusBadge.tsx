"use client";

import { CheckCircle2, Clock3, Package, Truck, XCircle } from "lucide-react";

import type { OrderStatus } from "@/types/order";

import styles from "./OrderStatusBadge.module.css";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className: styles.pending,
  },

  processing: {
    label: "Processing",
    icon: Package,
    className: styles.processing,
  },

  shipped: {
    label: "Shipped",
    icon: Truck,
    className: styles.shipped,
  },

  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: styles.delivered,
  },

  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: styles.cancelled,
  },
};

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <span
      className={`${styles.badge} ${config.className}`}
    >
      <Icon size={16} />

      {config.label}
    </span>
  );
}