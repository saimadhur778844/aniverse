interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  disabled = false,
}: AddToCartButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      Add to Cart
    </button>
  );
}
