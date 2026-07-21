import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import TrendingProducts from "@/components/TrendingProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <TrendingProducts />
    </>
  );
}