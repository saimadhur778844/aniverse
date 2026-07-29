"use client";

import {
  Package,
  Clock3,
  Truck,
  CheckCircle2,
} from "lucide-react";

import type { Order } from "@/types/order";

import styles from "./OrderStats.module.css";

interface OrderStatsProps {
  orders: Order[];
}

export default function OrderStats({
  orders,
}: OrderStatsProps) {
  const totalOrders = orders.length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: Package,
      className: styles.primary,
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Clock3,
      className: styles.warning,
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: Truck,
      className: styles.secondary,
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      className: styles.success,
    },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`${styles.card} ${stat.className}`}
          >
            <div className={styles.icon}>
              <Icon size={24} />
            </div>

            <div>
              <h3>{stat.value}</h3>

              <p>{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}