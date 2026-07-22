export interface HeroSlide {
  id: number;
  anime: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  href: string;
  accentColor: string;
}

export const heroData: HeroSlide[] = [
  {
    id: 1,
    anime: "ONE PIECE",
    title: "Gear 5 Collection",
    subtitle: "Exclusive Anime Figures",
    description:
      "Discover premium One Piece collectibles, figures, and accessories for every Straw Hat fan.",
    image: "/banners/onepiece.webp",
    buttonText: "Shop Now",
    href: "/products?anime=one-piece",
    accentColor: "#3B82F6", // Blue
  },
  {
    id: 2,
    anime: "NARUTO",
    title: "Shinobi Collection",
    subtitle: "Official Merchandise",
    description:
      "Explore legendary ninja figures, statues, and collectibles from the Hidden Leaf Village.",
    image: "/banners/naruto.webp",
    buttonText: "Explore",
    href: "/products?anime=naruto",
    accentColor: "#F97316", // Orange
  },
  {
    id: 3,
    anime: "JUJUTSU KAISEN",
    title: "Cursed Collection",
    subtitle: "Premium Figures",
    description:
      "Bring home your favorite sorcerers with exclusive collectibles and limited editions.",
    image: "/banners/jjk.webp",
    buttonText: "View Collection",
    href: "/products?anime=jujutsu-kaisen",
    accentColor: "#8B5CF6", // Purple
  },
  {
    id: 4,
    anime: "DEMON SLAYER",
    title: "Hashira Collection",
    subtitle: "Anime Collectibles",
    description:
      "Premium Demon Slayer figures, katanas, and collectibles crafted for true fans.",
    image: "/banners/demonslayer.webp",
    buttonText: "Discover",
    href: "/products?anime=demon-slayer",
    accentColor: "#06B6D4", // Cyan
  },
];