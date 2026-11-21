import type { ReactNode } from "react";

interface PreviewVariantProps {
  label: string;
  /** Use "w-full" so the instance fills the row. */
  className?: string;
  children: ReactNode;
}

export default function PreviewVariant({
  label,
  className = "",
  children,
}: PreviewVariantProps) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {children}
      <span className="text-body-sm text-fg-tertiary">{label}</span>
    </div>
  );
}
