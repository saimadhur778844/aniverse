"use client";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductGallery({ product }: Props) {
  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          borderRadius: 12,
        }}
      />
    </div>
  );
}