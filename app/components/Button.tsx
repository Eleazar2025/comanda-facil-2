import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

const VARIANT_STYLES = {
  primary:
    "bg-brand-primary text-brand-on-primary enabled:hover:bg-brand-primary-hover enabled:active:bg-brand-primary-active disabled:bg-status-neutral-bg disabled:text-fg-tertiary",
  secondary:
    "border border-line bg-surface text-fg-primary enabled:hover:bg-status-neutral-bg disabled:text-fg-tertiary",
  ghost:
    "bg-transparent text-fg-primary enabled:hover:bg-status-neutral-bg disabled:text-fg-tertiary",
  danger:
    "bg-action-danger text-brand-on-primary enabled:hover:bg-action-danger-hover disabled:bg-status-neutral-bg disabled:text-fg-tertiary",
};

/** Same look as VARIANT_STYLES, but links are never :enabled, so hover is not gated. */
const LINK_STYLES = {
  primary:
    "bg-brand-primary text-brand-on-primary hover:bg-brand-primary-hover active:bg-brand-primary-active",
  secondary: "border border-line bg-surface text-fg-primary hover:bg-status-neutral-bg",
  ghost: "bg-transparent text-fg-primary hover:bg-status-neutral-bg",
  danger: "bg-action-danger text-brand-on-primary hover:bg-action-danger-hover",
};

const SIZE_STYLES = {
  md: "h-10 gap-2 px-6 text-body-md",
  sm: "h-8 gap-1.5 px-4 text-body-sm",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_STYLES;
  size?: keyof typeof SIZE_STYLES;
  icon?: IconType;
  /** When set, renders a Link (navigation) with the same look as the button. */
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  href,
  type = "button",
  className = "",
  children = "Botão",
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-bold whitespace-nowrap transition-colors ${LINK_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      >
        {Icon ? <Icon className="size-5" aria-hidden="true" /> : null}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-bold whitespace-nowrap transition-colors disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {Icon ? <Icon className="size-5" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
