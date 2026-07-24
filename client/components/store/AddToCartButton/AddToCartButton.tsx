"use client";

import styles from "./AddToCartButton.module.css";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      Add to Cart
    </button>
  );
}