"use client";

import {
  CheckCircle2,
  Clock3,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import styles from "./OrderStatusBadge.module.css";

interface OrderStatusBadgeProps {
  status?: string;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  Pending: {
    label: "Pending",
    icon: Clock3,
    className: styles.pending,
  },

  Confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: styles.processing,
  },

  Packed: {
    label: "Packed",
    icon: Package,
    className: styles.processing,
  },

  Shipped: {
    label: "Shipped",
    icon: Truck,
    className: styles.shipped,
  },

  Delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: styles.delivered,
  },

  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: styles.cancelled,
  },
};

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const config =
    STATUS_CONFIG[status ?? "Pending"] ??
    STATUS_CONFIG.Pending;

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