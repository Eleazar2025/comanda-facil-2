import { LuPackage } from "react-icons/lu";

interface PlanUsageCardProps {
  title?: string;
  remaining: number;
  total: number;
}

export default function PlanUsageCard({
  title = "Plano Gratuito",
  remaining,
  total,
}: PlanUsageCardProps) {
  const percentage = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line-subtle bg-canvas p-4">
      <div className="flex items-center gap-2 text-body-sm font-semibold text-fg-primary">
        <LuPackage className="size-4" aria-hidden="true" />
        {title}
      </div>
      <p className="text-body-sm text-fg-tertiary">
        {remaining} de {total} pedidos restantes
      </p>
      <div
        role="progressbar"
        aria-label="Pedidos restantes"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={remaining}
        className="h-1 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-brand-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
