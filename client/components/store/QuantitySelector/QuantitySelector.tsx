"use client";

import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max,
}: QuantitySelectorProps) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
      >
        −
      </button>

      <span>{quantity}</span>

      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}