import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";

export default function Loading() {
  return (
    <Section>
      <SectionHeader
        title="Products"
        subtitle="Browse our complete collection."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="skeleton h-64 w-full rounded-2xl"
          />
        ))}
      </div>
    </Section>
  );
}