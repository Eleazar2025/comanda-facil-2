import type { IconType } from "react-icons";
import { LuLogOut } from "react-icons/lu";
import PlanUsageCard from "./PlanUsageCard";
import SidebarNavItem from "./SidebarNavItem";
import UpgradeCard from "./UpgradeCard";

interface SidebarItem {
  href: string;
  label: string;
  icon: IconType;
}

interface SidebarPlan {
  remaining: number;
  total: number;
}

interface SidebarProps {
  userName?: string;
  items: SidebarItem[];
  activeHref?: string;
  /** When set, shows the plan usage and upgrade cards above the footer. */
  plan?: SidebarPlan;
  onSignOut?: () => void;
}

export default function Sidebar({
  userName = "Usuário",
  items,
  activeHref,
  plan,
  onSignOut,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border border-line-subtle bg-sidebar p-5">
      <div className="mb-6 flex flex-col gap-1">
        <p className="font-display text-h3 font-semibold">
          Comanda<span className="text-fg-brand">Fácil</span>
        </p>
        <p className="text-body-md text-fg-tertiary">Olá, {userName}</p>
      </div>

      <nav aria-label="Navegação principal" className="flex flex-col gap-1">
        {items.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.href === activeHref}
          />
        ))}
      </nav>

      {plan ? (
        <div className="mt-6 flex flex-col gap-3">
          <PlanUsageCard remaining={plan.remaining} total={plan.total} />
          <UpgradeCard />
        </div>
      ) : null}

      <div className="mt-auto border-t border-line-subtle pt-4">
        <button
          type="button"
          onClick={onSignOut}
          className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-body-md font-semibold text-fg-primary transition-colors hover:bg-status-neutral-bg"
        >
          <LuLogOut className="size-5 shrink-0" aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  );
}
