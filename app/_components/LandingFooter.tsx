import Logo from "./Logo";

const FOOTER_LINK_STYLES =
  "cursor-pointer rounded-sm text-body-sm text-fg-secondary transition-colors hover:text-fg-primary";

const LINK_GROUPS = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Preços", href: "#precos" },
      { label: "Depoimentos", href: "#depoimentos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#contato" },
      { label: "Contato", href: "#contato" },
      { label: "Blog", href: "#contato" },
    ],
  },
];

const LEGAL_LINKS = ["Termos de uso", "Privacidade"];

export default function LandingFooter() {
  return (
    <footer
      id="contato"
      className="border-t border-line-subtle bg-canvas px-4 py-16 md:px-8"
    >
      <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex max-w-80 flex-col gap-3">
            <Logo />
            <p className="text-body-sm text-fg-secondary">
              A ferramenta que faltava na sua operação de restaurante. Gestão
              descomplicada para focar no que importa: servir bem.
            </p>
          </div>
          <div className="flex gap-12">
            {LINK_GROUPS.map((group) => (
              <nav
                key={group.title}
                aria-label={group.title}
                className="flex flex-col gap-3"
              >
                <h2 className="text-body-sm font-bold text-fg-primary">
                  {group.title}
                </h2>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={FOOTER_LINK_STYLES}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-line-subtle pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm text-fg-tertiary">
            © 2026 Comanda Fácil. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((label) => (
              <a key={label} href="#contato" className={FOOTER_LINK_STYLES}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
