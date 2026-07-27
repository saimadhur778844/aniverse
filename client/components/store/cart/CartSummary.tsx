"use client";

import Link from "next/link";

import useCart from "@/lib/hooks/useCart";

import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  onClose?: () => void;
}

export default function CartSummary({
  onClose,
}: CartSummaryProps) {
  const { subtotal } = useCart();

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Subtotal</span>

        <span className={styles.price}>
          ₹{subtotal.toLocaleString()}
        </span>
      </div>

      <Link
        href="/cart"
        className={`${styles.button} ${styles.secondary}`}
        onClick={onClose}
      >
        View Cart
      </Link>

      <Link
        href="/checkout"
        className={`${styles.button} ${styles.primary}`}
        onClick={onClose}
      >
        Checkout
      </Link>
    </div>
  );
}