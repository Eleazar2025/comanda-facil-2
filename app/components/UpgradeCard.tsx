import { LuStar } from "react-icons/lu";

interface UpgradeCardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function UpgradeCard({
  title = "Desbloqueie tudo!",
  description = "Pedidos ilimitados e acesso a todos os recursos.",
  actionLabel = "Seja Premium",
  onAction,
}: UpgradeCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-status-warning-border bg-status-warning-bg p-4">
      <div className="flex items-center gap-2 text-body-md font-bold text-status-warning-text">
        <LuStar className="size-4" aria-hidden="true" />
        {title}
      </div>
      <p className="text-body-md text-status-warning-text">{description}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-1 h-8 w-full cursor-pointer rounded-lg bg-brand-accent-amber text-body-md font-bold text-fg-primary transition-colors hover:bg-amber-600"
      >
        {actionLabel}
      </button>
    </div>
  );
}
