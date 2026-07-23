"use client";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div>
      <h1>{product.name}</h1>

      <h2>₹{product.price}</h2>

      <p>{product.description}</p>
    </div>
  );
}