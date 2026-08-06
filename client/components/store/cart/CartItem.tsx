"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";

import useCart from "@/lib/hooks/useCart";
import { CartItem as CartItemType } from "@/types/cart";
import { getPrimaryImage, getSellingPrice } from "@/utils/product";

import styles from "./CartItem.module.css";

interface Props {
  item: CartItemType;
  compact?: boolean;
}

export default function CartItem({
  item,
  compact = false,
}: Props) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <Image
        src={getPrimaryImage(product)}
        alt={product.name}
        width={90}
        height={90}
        className={styles.image}
      />

      <div className={styles.info}>
        <h3>{product.name}</h3>

        <p className={styles.price}>
          {getSellingPrice(product)}
        </p>

        <div className={styles.controls}>
          <button
            onClick={() =>
              updateQuantity(
                product._id,
                quantity - 1
              )
            }
          >
            <Minus size={14} />
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              updateQuantity(
                product._id,
                quantity + 1
              )
            }
          >
            <Plus size={14} />
          </button>

          <button
            className={styles.delete}
            onClick={() =>
              removeFromCart(product._id)
            }
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}