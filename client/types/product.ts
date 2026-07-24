export interface ProductCategory {
  _id: string;
  name: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  slug: string;

  id?: number;

  name: string;
  anime: string;
  description: string;

  /**
   * Primary display image.
   */
  image: string;

  /**
   * Additional gallery images.
   * If omitted or empty, fall back to `image`.
   */
  images?: string[];

  price: number;

  /**
   * Original price before discount.
   * Optional because not every product will be discounted.
   */
  originalPrice?: number;

  stock: number;

  featured: boolean;

  rating?: number;

  /**
   * Number of customer reviews.
   */
  reviewCount?: number;

  /**
   * Can be derived from stock > 0,
   * kept optional for future backend compatibility.
   */
  inStock?: boolean;

  category: string | ProductCategory;

  /**
   * Product specifications shown in the Specifications tab.
   */
  specifications?: ProductSpecification[];

  /**
   * Shipping information shown in the Shipping tab.
   */
  shipping?: {
    dispatchTime: string;
    courier?: string;
    packaging?: string;
  };
}