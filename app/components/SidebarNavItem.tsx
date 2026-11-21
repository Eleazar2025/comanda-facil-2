import Link from "next/link";
import type { IconType } from "react-icons";

const STATE_STYLES = {
  default:
    "text-fg-secondary hover:bg-status-neutral-bg hover:text-fg-primary",
  active:
    "bg-brand-primary text-brand-on-primary hover:bg-brand-primary-hover",
};

interface SidebarNavItemProps {
  href: string;
  label?: string;
  icon?: IconType;
  active?: boolean;
}

export default function SidebarNavItem({
  href,
  label = "Pedidos",
  icon: Icon,
  active = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex h-10 cursor-pointer items-center gap-3 rounded-xl px-3 text-body-md font-semibold transition-colors ${active ? STATE_STYLES.active : STATE_STYLES.default}`}
    >
      {Icon ? <Icon className="size-5 shrink-0" aria-hidden="true" /> : null}
      {label}
    </Link>
  );
}
