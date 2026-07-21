import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import FeaturedCollection from "@/components/FeaturedCollection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollection />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        ANIVERSE
      </main>
    </>
  );
}