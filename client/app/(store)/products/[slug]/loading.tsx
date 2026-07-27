import Section from "@/components/store/Section";

export default function Loading() {
  return (
    <Section>
      <div className="space-y-6">
        <div className="skeleton h-10 w-40 rounded-full" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="skeleton h-96 w-full rounded-3xl" />
            <div className="skeleton h-20 w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <div className="skeleton h-8 w-40 rounded-full" />
            <div className="skeleton h-12 w-3/4 rounded-full" />
            <div className="skeleton h-24 w-full rounded-2xl" />
            <div className="skeleton h-14 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </Section>
  );
}