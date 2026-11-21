import Badge from "../components/Badge";
import type { BadgeTone } from "../components/Badge";
import Button from "../components/Button";

interface SampleTable {
  name: string;
  status: string;
  tone: BadgeTone;
  items: string;
  total: string;
}

const SAMPLE_TABLES: SampleTable[] = [
  {
    name: "Mesa 12",
    status: "Em preparação",
    tone: "warning",
    items: "2x Risoto de Cogumelos, 1x Suco",
    total: "R$ 85,00",
  },
  {
    name: "Mesa 04",
    status: "Pronto",
    tone: "success",
    items: "1x Picanha Premium, 2x Cerveja",
    total: "R$ 124,00",
  },
];

/** Sample "real-time panel" shown next to the hero text. */
export default function HeroPanel() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line-subtle bg-surface-elevated p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-body-lg font-semibold text-fg-primary">
          Painel em Tempo Real
        </h2>
        <Badge tone="success">Ao vivo</Badge>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(calc(var(--spacing)*40),1fr))] gap-3">
        {SAMPLE_TABLES.map((table) => (
          <article
            key={table.name}
            className="flex flex-col gap-3 rounded-xl border border-line-subtle bg-canvas p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-body-md font-bold text-fg-primary">
                {table.name}
              </span>
              <Badge tone={table.tone}>{table.status}</Badge>
            </div>
            <p className="text-body-sm text-fg-secondary">{table.items}</p>
            <div className="flex items-end justify-between gap-2 border-t border-line-subtle pt-3">
              <div className="flex flex-col">
                <span className="text-body-sm text-fg-tertiary">Total</span>
                <span className="text-body-md font-bold text-fg-brand">
                  {table.total}
                </span>
              </div>
              <Button variant="secondary" size="sm">
                Detalhes
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
