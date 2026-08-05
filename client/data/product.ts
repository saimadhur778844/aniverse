import { Product } from "@/types/product";

const products: Product[] = [
  {
    _id: "1",
    slug: "gear-5-luffy-figure",
    id: 1,
    name: "Gear 5 Luffy Figure",
    anime: "One Piece",
    category: "Figures",
    description: "Gear 5 Luffy collectible figure.",
    price: 4999,
    stock: 10,
    image: "/images/products/luffy-gear5.jpg",
    rating: 4.9,
    inStock: true,
    featured: true,
  },
  {
    _id: "2",
    slug: "zoro-katana",
    id: 2,
    name: "Zoro Katana",
    anime: "One Piece",
    category: "Katanas",
    description: "Zoro katana collectible.",
    price: 7999,
    stock: 10,
    image: "/images/products/zoro-katana.jpg",
    rating: 4.8,
    inStock: true,
    featured: true,
  },
];

export default products;