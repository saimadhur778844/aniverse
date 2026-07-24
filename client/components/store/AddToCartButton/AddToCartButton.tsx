"use client";

import styles from "./AddToCartButton.module.css";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Add product to cart"
    >
      <span className={styles.icon}>🛒</span>
      <span>Add to Cart</span>
    </button>
  );
}