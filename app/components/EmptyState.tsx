import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface EmptyStateProps {
  icon?: IconType;
  title?: string;
  description?: string;
  /** Optional action (e.g. a Button). */
  children?: ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title = "Nenhum item encontrado",
  description = "Adicione novos itens para começar.",
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-status-neutral-bg text-icon-default">
        {Icon ? <Icon className="size-6" aria-hidden="true" /> : null}
      </div>
      <p className="text-body-lg font-semibold text-fg-primary">{title}</p>
      <p className="text-body-md text-fg-secondary">{description}</p>
      {children}
    </div>
  );
}
