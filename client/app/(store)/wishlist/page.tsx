"use client";

import Link from "next/link";

import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import ProductGrid from "@/components/store/ProductGrid";
import Button from "@/components/shared/Button";

import { useWishlist } from "@/context/WishlistContext/WishlistContext";

import styles from "./WishlistPage.module.css";

export default function WishlistPage() {
  const {
    items,
    clearWishlist,
    isEmpty,
  } = useWishlist();

  return (
    <Section>
      <SectionHeader
        title="My Wishlist"
        subtitle={`${items.length} saved product${
          items.length !== 1 ? "s" : ""
        }`}
      />

      {isEmpty ? (
        <div className={styles.emptyState}>
          <div className={styles.icon}>
            ❤️
          </div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save your favourite collectibles
            and they'll appear here.
          </p>

          <Link href="/products">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.actions}>
            <Button
              variant="secondary"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </Button>
          </div>

          <ProductGrid products={items} />
        </>
      )}
    </Section>
  );
}