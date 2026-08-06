"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { Product } from "@/types/product";
import { getPrimaryImage } from "@/utils/product";

import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const images = (product.images?.length
    ? product.images
    : [getPrimaryImage(product)]
  ).map((img) =>
    typeof img === "string" ? img : img.url
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={clsx("card", "card-padding", styles.gallery)}>
      <div className={styles.mainImage}>
        {!imageLoaded && (
          <div className="skeleton" />
        )}

        <Image
          key={images[selectedIndex]}
          src={images[selectedIndex]}
          alt={product.name}
          fill
          priority
          sizes="(max-width:768px) 100vw, 50vw"
          className={clsx(
            styles.image,
            imageLoaded && "animate-fade-in"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailGrid}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => {
                setImageLoaded(false);
                setSelectedIndex(index);
              }}
              className={clsx(
                styles.thumbnail,
                index === selectedIndex &&
                  styles.activeThumbnail
              )}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                fill
                sizes="80px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}