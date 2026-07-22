import Hero from "@/components/store/Hero";
import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import FeaturedSection from "@/components/store/FeaturedSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Section>
        <SectionHeader
          title="Featured Products"
          subtitle="Discover our most popular anime collectibles."
        />

        {/* Featured products will go here */}
      </Section>

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