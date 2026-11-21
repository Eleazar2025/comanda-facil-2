"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LuClipboardList, LuMenu, LuPackage, LuTag, LuUsers, LuX } from "react-icons/lu";
import IconButton from "../../components/IconButton";
import Sidebar from "../../components/Sidebar";

const SIDEBAR_ITEMS = [
  { href: "/pedidos", label: "Pedidos", icon: LuClipboardList },
  { href: "/produtos", label: "Produtos", icon: LuPackage },
  { href: "/configuracoes", label: "Configurações", icon: LuTag },
  { href: "/funcionarios", label: "Funcionários", icon: LuUsers },
];

const DRAWER_STATE_STYLES = {
  open: "visible translate-x-0 opacity-100",
  closed: "invisible -translate-x-4 opacity-0",
};

const BACKDROP_STATE_STYLES = {
  open: "visible opacity-100",
  closed: "invisible opacity-0",
};

interface PanelShellProps {
  /** Href of the current page, marked as active in the menu. */
  activeHref: string;
  children: ReactNode;
}

/** Panel layout: fixed sidebar on large screens, drawer opened by a top bar on mobile. */
export default function PanelShell({ activeHref, children }: PanelShellProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerState = menuOpen ? "open" : "closed";

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const sidebarProps = {
    userName: "Maria Souza",
    items: SIDEBAR_ITEMS,
    activeHref,
    plan: { remaining: 99, total: 100 },
    onSignOut: () => router.push("/login"),
  };

  return (
    <div className="flex flex-1 flex-col md:h-dvh md:flex-row">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-line-subtle bg-sidebar px-4 md:hidden">
        <IconButton icon={LuMenu} label="Abrir menu" onClick={() => setMenuOpen(true)} />
        <p className="font-display text-h3 font-semibold">
          Comanda<span className="text-fg-brand">Fácil</span>
        </p>
      </header>

      <div className="hidden w-64 shrink-0 md:block">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile drawer: stays mounted so opening and closing can fade and slide */}
      <div className="md:hidden">
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 z-20 bg-fg-primary/40 transition-opacity ${BACKDROP_STATE_STYLES[drawerState]}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`fixed inset-y-0 left-0 z-30 w-64 transition-all ${DRAWER_STATE_STYLES[drawerState]}`}
        >
          <Sidebar {...sidebarProps} />
          <IconButton
            icon={LuX}
            label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4"
          />
        </div>
      </div>

      <main className="flex min-w-0 flex-1 flex-col p-4 md:min-h-0 md:p-8">{children}</main>
    </div>
  );
}
