"use client";

import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Preços", href: "#precos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const MENU_STYLES = {
  open: "translate-y-0 opacity-100",
  closed: "pointer-events-none -translate-y-2 opacity-0",
};

const NAV_LINK_STYLES =
  "cursor-pointer rounded-sm text-body-md font-semibold text-fg-secondary transition-colors hover:text-fg-primary md:text-body-sm";

export default function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-subtle bg-surface">
      <div className="mx-auto flex h-16 w-full max-w-300 items-center justify-between gap-4 px-4 md:px-8">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={NAV_LINK_STYLES}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="secondary" size="sm">
            Entrar
          </Button>
          <Button href="/criar-conta" size="sm">
            Começar Agora
          </Button>
        </div>

        <IconButton
          className="md:hidden"
          icon={open ? LuX : LuMenu}
          label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        />
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full flex flex-col gap-4 border-b border-line-subtle bg-surface p-4 shadow-md transition md:hidden ${open ? MENU_STYLES.open : MENU_STYLES.closed}`}
      >
        <nav aria-label="Principal (celular)" className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={NAV_LINK_STYLES}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          <Button href="/login" variant="secondary" className="flex-1">
            Entrar
          </Button>
          <Button href="/criar-conta" className="flex-1">
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
}
