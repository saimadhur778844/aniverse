export interface Product {
  _id: string;
  slug: string;

  id?: number;

  name: string;
  anime: string;
  description: string;

  // Current local image
  image: string;

  // Future support for multiple images (Cloudinary/local)
  images?: string[];

  price: number;
  stock: number;

  featured: boolean;

  rating?: number;

  // Can later be derived from stock > 0
  inStock?: boolean;

  category:
    | string
    | {
        _id: string;
        name: string;
      };
}