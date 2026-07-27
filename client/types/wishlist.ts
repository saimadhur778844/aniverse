import { Product } from "./product";

export interface WishlistContextType {
  items: Product[];

  addToWishlist: (product: Product) => void;

  removeFromWishlist: (
    productId: string
  ) => void;

  toggleWishlist: (
    product: Product
  ) => void;

  clearWishlist: () => void;

  isInWishlist: (
    productId: string
  ) => boolean;

  totalItems: number;

  isEmpty: boolean;
}