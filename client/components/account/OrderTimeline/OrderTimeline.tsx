"use client";

import {
  CheckCircle2,
  Clock3,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";

import styles from "./OrderTimeline.module.css";

interface OrderTimelineProps {
  status: OrderStatus;
}

const STEPS = [
  {
    key: "Pending",
    label: "Order Placed",
    icon: Clock3,
  },
  {
    key: "Confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
  },
  {
    key: "Packed",
    label: "Packed",
    icon: Package,
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: CheckCircle2,
  },
] as const;

export default function OrderTimeline({
  status,
}: OrderTimelineProps) {
  /*
  |--------------------------------------------------------------------------
  | Cancelled Orders
  |--------------------------------------------------------------------------
  */

  if (status === "Cancelled") {
    return (
      <div className={styles.timeline}>
        <div className={styles.step}>
          <div
            className={`${styles.icon} ${styles.completed}`}
          >
            <XCircle size={20} />
          </div>

          <span>Order Cancelled</span>
        </div>
      </div>
    );
  }

  const currentIndex =
    STEPS.findIndex(
      (step) => step.key === status
    );

  return (
    <div className={styles.timeline}>
      {STEPS.map((step, index) => {
        const completed =
          currentIndex >= index;

        const Icon = step.icon;

        return (
          <div
            key={step.key}
            className={styles.step}
          >
            <div
              className={`${styles.icon} ${
                completed
                  ? styles.completed
                  : ""
              }`}
            >
              <Icon size={20} />
            </div>

            <span>{step.label}</span>

            {index !==
              STEPS.length - 1 && (
              <div
                className={`${styles.line} ${
                  currentIndex > index
                    ? styles.completedLine
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}