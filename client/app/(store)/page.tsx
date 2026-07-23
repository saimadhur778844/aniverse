import Hero from "@/components/store/Hero";
import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import FeaturedSection from "@/components/store/FeaturedSection";
import CategorySection from "@/components/store/CategorySection";
import ProductToolbar from "@/components/store/ProductToolbar";

export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedSection />

      <Section>
        <SectionHeader
          title="Shop by Category"
          subtitle="Browse collectibles by category."
        />

        {/* Categories will go here */}
      </Section>

      <Section>
        <SectionHeader
          title="Anime Collections"
          subtitle="Explore collections from your favorite anime."
        />

        {/* Collections will go here */}
      </Section>
    </>
  );
}