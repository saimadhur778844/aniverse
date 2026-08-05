"use client";

import type { Order } from "@/types/order";

import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({
  order,
}: OrderSummaryProps) {
  return (
    <div className={styles.card}>
      <h3>Order Summary</h3>

      <div className={styles.row}>
        <span>Subtotal</span>

        <span>
          ₹{order.subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      <div className={styles.row}>
        <span>Shipping</span>

        <span>
          ₹{order.shippingCharge.toLocaleString(
            "en-IN"
          )}
        </span>
      </div>

      <div className={styles.row}>
        <span>Tax</span>

        <span>
          ₹{order.tax.toLocaleString("en-IN")}
        </span>
      </div>

      {order.discount > 0 && (
        <div className={styles.row}>
          <span>Discount</span>

          <span className={styles.discount}>
            -₹
            {order.discount.toLocaleString(
              "en-IN"
            )}
          </span>
        </div>
      )}

      <div
        className={`${styles.row} ${styles.total}`}
      >
        <span>Total</span>

        <span>
          ₹{order.total.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}