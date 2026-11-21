import { useId } from "react";
import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import IconButton from "./IconButton";

interface ModalContainerProps {
  title?: string;
  closeLabel?: string;
  onClose?: () => void;
  children?: ReactNode;
}

/** Visual container for modals. The backdrop/positioning belongs to the screen using it. */
export default function ModalContainer({
  title = "Título do modal",
  closeLabel = "Fechar",
  onClose,
  children,
}: ModalContainerProps) {
  const titleId = useId();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-surface-elevated p-8 shadow-lg"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id={titleId}
          className="font-display text-h3 font-semibold text-fg-primary"
        >
          {title}
        </h2>
        <IconButton
          icon={LuX}
          label={closeLabel}
          shape="round"
          onClick={onClose}
        />
      </div>
      <div className="text-body-md text-fg-tertiary">{children}</div>
    </div>
  );
}
