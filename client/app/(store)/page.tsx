import Hero from "@/components/store/Hero";
import FeaturedSection from "@/components/store/FeaturedSection";
import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import CategorySection from "@/components/store/CategorySection";

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

        <CategorySection />
      </Section>

      <Section>
        <SectionHeader
          title="Anime Collections"
          subtitle="Explore collections from your favorite anime."
        />

        {/* TODO: AnimeCollections component */}
      </Section>

      <Section>
        <SectionHeader
          title="New Arrivals"
          subtitle="Freshly added collectibles."
        />

        {/* TODO: NewArrivals component */}
      </Section>
    </>
  );
}