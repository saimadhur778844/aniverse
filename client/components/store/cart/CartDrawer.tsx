"use client";

import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function CartDrawer({
  open,
  onClose,
  children,
}: CartDrawerProps) {
    const { items, isEmpty } = useCart();
  return (
    <>
      <div
        className={`${styles.overlay} ${
          open ? styles.show : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`${styles.drawer} ${
          open ? styles.open : ""
        }`}
      >
        <div className={styles.header}>
          <h2>Shopping Cart</h2>

          <button
            onClick={onClose}
            className={styles.close}
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
  {isEmpty ? (
    <div className={styles.items}>
      <p
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Your cart is empty.
      </p>
    </div>
  ) : (
    <>
      <div className={styles.items}>
        {items.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
          />
        ))}
      </div>

      <CartSummary onClose={onClose} />
    </>
  )}
</div>
      </aside>
    </>
  );
}