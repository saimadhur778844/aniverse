"use client";

import Link from "next/link";
import Image from "next/image";

import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import Rating from "@/components/store/Rating";
import StockBadge from "@/components/store/StockBadge";

import { useCart } from "@/context/CartContext/CartContext";
import { useWishlist } from "@/context/WishlistContext/WishlistContext";

import { Product } from "@/types/product";
import {
  getPrimaryImage,
  getSellingPrice,
  getDiscount,
} from "@/utils/product";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const category = product.category;

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const inWishlist = isInWishlist(
    product._id
  );

  return (
    <Link
      href={`/products/${product.slug}`}
      className={styles.link}
      aria-label={`View ${product.name}`}
    >
      <Card
        hover
        className={styles.card}
      >
        <div className={styles.imageContainer}>
          <Image
            src={getPrimaryImage(product)}
            alt={product.name}
            fill
            priority={false}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className={styles.image}
          />

          {product.featured && (
            <Badge
              variant="warning"
              className={styles.badge}
            >
              Featured
            </Badge>
          )}

          <button
            type="button"
            className={`${styles.wishlistButton} ${
              inWishlist
                ? styles.activeWishlist
                : ""
            }`}
            aria-label={
              inWishlist
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={inWishlist}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleWishlist(product);
            }}
          >
            {inWishlist ? "♥" : "♡"}
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.category}>
            {category}
          </p>

          <h3 className={styles.name}>
            {product.name}
          </h3>

          <Rating
            rating={product.averageRating ?? 0}
            reviewCount={product.reviewCount}
          />

          <StockBadge
            stock={product.inventory.stock}
          />

          <div className={styles.footer}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>
                {getSellingPrice(product)}
              </span>

              {product.mrp > product.sellingPrice && getDiscount(product) > 0 && (
                <span
                  className={
                    styles.originalPrice
                  }
                >
                  ₹
                  {product.mrp.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}
            </div>

            <Button
              variant="primary"
              disabled={
                product.inventory.stock <= 0
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                addToCart(product, 1);
              }}
            >
              {product.inventory.stock > 0
                ? "Add to Cart"
                : "Sold Out"}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}