import type { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  description?: string;
  /** Optional actions shown on the right (e.g. a Button). */
  children?: ReactNode;
}

export default function PageHeader({
  title = "Título da página",
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-h2 font-semibold text-fg-primary">
          {title}
        </h1>
        {description ? (
          <p className="text-body-md text-fg-secondary">{description}</p>
        ) : null}
      </div>
      {children}
    </header>
  );
}
