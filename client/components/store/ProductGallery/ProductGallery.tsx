"use client";

import { useState } from "react";
import Image from "next/image";

import { Product } from "@/types/product";

import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  // Support both current single image and future multiple images
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const [selectedImage, setSelectedImage] = useState(
    images[0] ?? ""
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`${styles.thumb} ${
                selectedImage === image ? styles.active : ""
              }`}
            >
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="80px"
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}