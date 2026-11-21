import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

const TONE_STYLES = {
  default:
    "text-icon-default enabled:hover:bg-status-neutral-bg enabled:hover:text-fg-primary",
  danger:
    "text-icon-default enabled:hover:bg-status-danger-bg enabled:hover:text-action-danger",
};

const SHAPE_STYLES = {
  square: "rounded-lg",
  round: "rounded-full bg-status-neutral-bg",
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  /** Accessible name, since the button has no visible text. */
  label: string;
  tone?: keyof typeof TONE_STYLES;
  shape?: keyof typeof SHAPE_STYLES;
}

export default function IconButton({
  icon: Icon,
  label,
  tone = "default",
  shape = "square",
  type = "button",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed disabled:text-icon-muted ${TONE_STYLES[tone]} ${SHAPE_STYLES[shape]} ${className}`}
      {...props}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
