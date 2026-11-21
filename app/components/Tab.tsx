import type { ButtonHTMLAttributes } from "react";

const STATE_STYLES = {
  default:
    "border-line-subtle text-fg-secondary hover:border-line hover:text-fg-primary",
  active: "border-brand-primary text-brand-primary hover:text-brand-primary-hover",
};

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function Tab({
  active = false,
  type = "button",
  className = "",
  children = "Tab",
  ...props
}: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={active}
      className={`h-10 cursor-pointer border-b-2 px-6 text-body-md font-semibold transition-colors ${active ? STATE_STYLES.active : STATE_STYLES.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
