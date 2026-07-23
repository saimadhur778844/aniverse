import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products?: Product[];
}

export default function RelatedProducts({
  products = [],
}: RelatedProductsProps) {
  return <section aria-label="Related products">{products.length > 0 && null}</section>;
}
