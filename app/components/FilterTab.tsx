import type { ButtonHTMLAttributes } from "react";

const STATE_STYLES = {
  default:
    "border-line bg-surface text-fg-primary hover:bg-status-neutral-bg",
  active:
    "border-brand-primary bg-brand-primary text-brand-on-primary hover:border-brand-primary-hover hover:bg-brand-primary-hover",
};

interface FilterTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function FilterTab({
  active = false,
  type = "button",
  className = "",
  children = "Todos",
  ...props
}: FilterTabProps) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={`inline-flex h-8 cursor-pointer items-center rounded-full border px-4 text-body-sm font-semibold transition-colors ${active ? STATE_STYLES.active : STATE_STYLES.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
