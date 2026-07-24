"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import styles from "./CartBadge.module.css";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className={styles.cart}>
      <ShoppingCart size={24} />

      {totalItems > 0 && (
        <span className={styles.badge}>
          {totalItems}
        </span>
        <span className={styles.badge}>
        {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}