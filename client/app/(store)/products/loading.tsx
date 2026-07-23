import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";

export default function Loading() {
  return (
    <Section>
      <SectionHeader
        title="Products"
        subtitle="Loading..."
      />

      <p>Loading products...</p>
    </Section>
  );
}