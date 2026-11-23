import { useId } from "react";
import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import IconButton from "./IconButton";

const SIZE_STYLES = {
  default: {
    container: "max-w-md gap-4 p-8",
    title: "text-h3",
    body: "text-body-md",
  },
  /** Narrower modal (400px on large screens, full width on mobile). */
  compact: {
    container: "gap-4 p-5 md:max-w-100 md:p-6",
    title: "text-h3",
    body: "text-body-md",
  },
  /** Wider modal for forms (500px on large screens, full width on mobile). */
  wide: {
    container: "gap-6 p-5 md:max-w-125 md:p-8",
    title: "text-h3",
    body: "text-body-md",
  },
};

interface ModalContainerProps {
  size?: keyof typeof SIZE_STYLES;
  title?: string;
  closeLabel?: string;
  onClose?: () => void;
  children?: ReactNode;
}

/** Visual container for modals. The backdrop/positioning belongs to the screen using it. */
export default function ModalContainer({
  size = "default",
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
      className={`flex w-full flex-col rounded-2xl bg-surface-elevated shadow-lg ${SIZE_STYLES[size].container}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id={titleId}
          className={`font-display font-semibold text-fg-primary ${SIZE_STYLES[size].title}`}
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
      <div className={`text-fg-tertiary ${SIZE_STYLES[size].body}`}>{children}</div>
    </div>
  );
}
