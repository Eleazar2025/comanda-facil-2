import { LuX } from "react-icons/lu";
import IconButton from "./IconButton";

interface MesaCardProps {
  number: number;
  name?: string;
  removeLabel?: string;
  onRemove?: () => void;
}

export default function MesaCard({
  number,
  name = `Mesa ${number}`,
  removeLabel = "Remover mesa",
  onRemove,
}: MesaCardProps) {
  return (
    <article className="flex items-center justify-between gap-3 rounded-2xl border border-line-subtle bg-surface px-4 py-3 shadow-sm transition-shadow hover:border-status-danger-border hover:shadow-md">
      <div className="flex flex-col">
        <span className="text-body-lg font-bold text-fg-primary">{number}</span>
        <span className="text-body-sm text-fg-secondary">{name}</span>
      </div>
      <IconButton icon={LuX} label={removeLabel} onClick={onRemove} />
    </article>
  );
}
