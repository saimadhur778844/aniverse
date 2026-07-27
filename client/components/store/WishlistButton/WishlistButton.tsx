"use client";

import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext/WishlistContext";

import styles from "./WishlistButton.module.css";

interface Props {
  product: Product;
}

export default function WishlistButton({
  product,
}: Props) {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const inWishlist = isInWishlist(
    product._id
  );

  return (
    <button
      type="button"
      className={`${styles.button} ${
        inWishlist ? styles.active : ""
      }`}
      onClick={() =>
        toggleWishlist(product)
      }
      aria-label={
        inWishlist
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      aria-pressed={inWishlist}
    >
      <span className={styles.icon}>
        {inWishlist ? "♥" : "♡"}
      </span>

      <span>
        {inWishlist
          ? "In Wishlist"
          : "Add to Wishlist"}
      </span>
    </button>
  );
}