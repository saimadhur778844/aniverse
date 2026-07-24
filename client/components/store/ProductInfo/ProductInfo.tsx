"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import QuantitySelector from "../QuantitySelector";
import AddToCartButton from "../AddToCartButton";
import WishlistButton from "../WishlistButton";

import styles from "./ProductInfo.module.css";
import Rating from "../Rating";
import StockBadge from "../StockBadge";
import ProductMeta from "../ProductMeta";
import RelatedProducts from "@/components/store/RelatedProducts";
import useCart from "@/hooks/useCart";

interface Props {
  product: Product;
}

export default function ProductInfo({
  product,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

//   const category =
//     typeof product.category === "string"
//       ? product.category
//       : product.category.name;

  return (
    <div className={styles.container}>
      <p className={styles.anime}>{product.anime}</p>

      <h1>{product.name}</h1>

      {product.rating !== undefined && (
        <Rating rating={product.rating} />
        )}

      <h2 className={styles.price}>
        ₹{product.price.toLocaleString()}
      </h2>

      <ProductMeta product={product} />

      <p className={styles.description}>
        {product.description}
      </p>

      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
        max={product.stock}
      />

      <div className={styles.actions}>
        <AddToCartButton
        onClick={() => addToCart(product, quantity)}
        disabled={product.stock === 0}
        />

        <WishlistButton
          onClick={() =>
            console.log("Wishlist", product)
          }
        />
      </div>
      <div className={styles.related}>
  <RelatedProducts currentProduct={product} />
</div>
    </div>

    
  );
}