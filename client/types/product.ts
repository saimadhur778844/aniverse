export interface Product {
  _id: string;
  id?: number;
  name: string;
  anime: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  featured: boolean;
  rating?: number;
  inStock?: boolean;
  category:
    | string
    | {
        _id: string;
        name: string;
      };
}