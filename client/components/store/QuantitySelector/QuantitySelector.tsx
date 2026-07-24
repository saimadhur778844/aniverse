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
  const decrease = () => {
    onChange(Math.max(1, quantity - 1));
  };

  const increase = () => {
    onChange(Math.min(max, quantity + 1));
  };

  const isMin = quantity <= 1;
  const isMax = quantity >= max;

  return (
    <div
      className={styles.container}
      aria-label="Quantity Selector"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={isMin}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        className={styles.value}
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={isMax}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}