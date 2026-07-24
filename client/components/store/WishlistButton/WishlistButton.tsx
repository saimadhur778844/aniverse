"use client";

import styles from "./WishlistButton.module.css";

interface Props {
  onClick: () => void;
}

export default function WishlistButton({
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Add product to wishlist"
    >
      <span className={styles.icon}>♡</span>

      <span>Wishlist</span>
    </button>
  );
}