import { useId } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import Button from "./Button";

interface ConfirmationModalProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/** Visual container for confirmations. The backdrop/positioning belongs to the screen using it. */
export default function ConfirmationModal({
  title = "Confirmar ação?",
  message = "Tem certeza que deseja continuar?",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const titleId = useId();
  const messageId = useId();

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-surface-elevated p-8 text-center shadow-lg"
    >
      <div className="flex size-13 items-center justify-center rounded-full border border-status-danger-border bg-status-danger-bg text-status-danger-text">
        <LuTriangleAlert className="size-6" aria-hidden="true" />
      </div>
      <h2
        id={titleId}
        className="font-display text-h3 font-semibold text-fg-primary"
      >
        {title}
      </h2>
      <p id={messageId} className="text-body-md text-fg-secondary">
        {message}
      </p>
      <div className="mt-2 flex w-full gap-3">
        <Button variant="secondary" className="flex-1" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button className="flex-1" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
