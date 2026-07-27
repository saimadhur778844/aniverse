"use client";

import { useCallback, useMemo, useState } from "react";

import { Product } from "@/types/product";

import Rating from "../Rating";
import ProductMeta from "../ProductMeta";
import QuantitySelector from "../QuantitySelector";
import AddToCartButton from "../AddToCartButton";
import WishlistButton from "../WishlistButton";
import StockBadge from "../StockBadge";

import useCart from "@/lib/hooks/useCart";

import styles from "./ProductInfo.module.css";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;

  const discountPercentage = useMemo(() => {
    if (
      !product.originalPrice ||
      product.originalPrice <= product.price
    ) {
      return null;
    }

    return Math.round(
      ((product.originalPrice - product.price) /
        product.originalPrice) *
        100
    );
  }, [
    product.originalPrice,
    product.price,
  ]);

  const handleAddToCart =
    useCallback(() => {
      addToCart(product, quantity);
    }, [
      addToCart,
      product,
      quantity,
    ]);

  return (
    <div className={styles.container}>
      <p className={styles.anime}>
        {product.anime}
      </p>

      <h1 className={styles.title}>
        {product.name}
      </h1>

      {product.rating !== undefined && (
        <Rating
          rating={product.rating}
          reviewCount={
            product.reviewCount
          }
        />
      )}

      <div className={styles.priceSection}>
        <h2 className={styles.price}>
          ₹
          {product.price.toLocaleString(
            "en-IN"
          )}
        </h2>

        {product.originalPrice && (
          <span
            className={
              styles.originalPrice
            }
          >
            ₹
            {product.originalPrice.toLocaleString(
              "en-IN"
            )}
          </span>
        )}

        {discountPercentage && (
          <span
            className={
              styles.discount
            }
          >
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      <StockBadge
        stock={product.stock}
      />

      <ProductMeta product={product} />

      <p
        className={
          styles.description
        }
      >
        {product.description}
      </p>

      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
        max={product.stock}
      />

      <div className={styles.actions}>
        <AddToCartButton
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        />

        <WishlistButton
          product={product}
        />
      </div>
    </div>
  );
}