export interface HeroSlide {
  anime: string;
  title: string;
  subtitle: string;
  description: string;

  image: string;
  href: string;

  buttonText: string;

  accentColor: string;

  badge?: string;
  featured?: boolean;
}

export const heroData: HeroSlide[] = [
  {
    anime: "ONE PIECE",

    title: "Gear 5 Luffy",

    subtitle: "Premium Collectible Figures",

    description:
      "Discover officially licensed One Piece figures, statues, keychains, posters and exclusive collectibles for every Straw Hat fan.",

    image: "/images/hero/luffy.png",

    href: "/products?anime=one-piece",

    buttonText: "Shop Collection",

    accentColor: "#F5C542",

    badge: "Best Seller",

    featured: true,
  },

  {
    anime: "NARUTO",

    title: "Naruto Uzumaki",

    subtitle: "Become the Hokage",

    description:
      "Explore premium Naruto figures, Akatsuki collectibles, kunai replicas and exclusive merchandise from the Hidden Leaf Village.",

    image: "/images/hero/naruto.png",

    href: "/products?anime=naruto",

    buttonText: "Explore Naruto",

    accentColor: "#F97316",

    badge: "New Arrival",

    featured: true,
  },

  {
    anime: "DEMON SLAYER",

    title: "Tanjiro Kamado",

    subtitle: "Breathe the Power",

    description:
      "Bring home beautifully crafted Demon Slayer collectibles featuring Tanjiro, Nezuko, Zenitsu, Inosuke and the Hashira.",

    image: "/images/hero/tanjiro.png",

    href: "/products?anime=demon-slayer",

    buttonText: "View Collection",

    accentColor: "#10B981",

    badge: "Trending",

    featured: true,
  },

  {
    anime: "JUJUTSU KAISEN",

    title: "Gojo Satoru",

    subtitle: "Unlimited Power",

    description:
      "Premium Jujutsu Kaisen figures, acrylic stands, apparel and collectibles featuring Gojo, Yuji, Megumi and Sukuna.",

    image: "/images/hero/gojo.png",

    href: "/products?anime=jujutsu-kaisen",

    buttonText: "Shop JJK",

    accentColor: "#8B5CF6",

    badge: "Limited Edition",

    featured: true,
  },

  {
    anime: "ATTACK ON TITAN",

    title: "Survey Corps",

    subtitle: "Fight Beyond the Walls",

    description:
      "Explore premium Attack on Titan figures and collectibles inspired by Eren, Levi, Mikasa and the legendary Survey Corps.",

    image: "/images/hero/eren.png",

    href: "/products?anime=attack-on-titan",

    buttonText: "Explore AoT",

    accentColor: "#DC2626",

    badge: "Exclusive",

    featured: true,
  },
];