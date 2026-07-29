"use client";

import {
  CheckCircle2,
  Clock3,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";

import styles from "./OrderTimeline.module.css";

interface OrderTimelineProps {
  status: OrderStatus;
}

const STEPS = [
  {
    key: "pending",
    label: "Order Placed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
] as const;

export default function OrderTimeline({
  status,
}: OrderTimelineProps) {
  const currentIndex = STEPS.findIndex(
    (step) => step.key === status
  );

  return (
    <div className={styles.timeline}>
      {STEPS.map((step, index) => {
        const completed =
          currentIndex >= index;

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
              {completed ? (
                <CheckCircle2 size={20} />
              ) : (
                <Clock3 size={20} />
              )}
            </div>

            <span>{step.label}</span>

            {index !== STEPS.length - 1 && (
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