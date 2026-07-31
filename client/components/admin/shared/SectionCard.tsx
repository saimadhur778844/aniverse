import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-2xl bg-[#171726] p-6">

      <h2 className="mb-5 text-2xl font-semibold text-white">
        {title}
      </h2>

      {children}

    </div>
  );
}