interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <input
      type="number"
      min={1}
      value={value}
      onChange={(event) => onChange(Math.max(1, Number(event.target.value)))}
      aria-label="Quantity"
    />
  );
}
