import type { ReactNode } from "react";

interface PreviewSectionProps {
  title: string;
  children: ReactNode;
}

export default function PreviewSection({
  title,
  children,
}: PreviewSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-h3 font-semibold text-fg-primary">
        {title}
      </h2>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </section>
  );
}
