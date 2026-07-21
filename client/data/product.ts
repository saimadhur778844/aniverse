import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Gear 5 Luffy Figure",
    anime: "One Piece",
    category: "Figures",
    price: 4999,
    image: "/images/products/luffy-gear5.jpg",
    rating: 4.9,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Zoro Katana",
    anime: "One Piece",
    category: "Katanas",
    price: 7999,
    image: "/images/products/zoro-katana.jpg",
    rating: 4.8,
    inStock: true,
    featured: true,
  },
];

export default products;