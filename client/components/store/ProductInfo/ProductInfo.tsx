"use client";

import { useCallback, useMemo, useState } from "react";

import { Product } from "@/types/product";
import {
  getStock,
  getSellingPrice,
  getMRP,
  getDiscount,
} from "@/utils/product";

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

  const isOutOfStock = product.inventory.stock <= 0;

  const discountPercentage = useMemo(() => {
    const discount = getDiscount(product);
    return discount > 0 ? discount : null;
  }, [product]);

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

      {product.averageRating !== undefined && (
        <Rating
          rating={product.averageRating}
          reviewCount={
            product.reviewCount
          }
        />
      )}

      <div className={styles.priceSection}>
        <h2 className={styles.price}>
          {getSellingPrice(product)}
        </h2>

        {product.mrp > product.sellingPrice && getDiscount(product) > 0 && (
          <span
            className={
              styles.originalPrice
            }
          >
            {getMRP(product)}
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
        stock={product.inventory.stock}
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
        max={product.inventory.stock}
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