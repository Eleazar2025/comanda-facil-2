"use client";

import Badge from "./Badge";
import type { BadgeTone } from "./Badge";
import Button from "./Button";

interface OrderCardProps {
  title?: string;
  status?: string;
  statusTone?: BadgeTone;
  itemsCount?: number;
  itemsSummary?: string;
  total?: string;
  detailsLabel?: string;
  /** Opens the order details. Makes the whole card clickable (the button is the keyboard path). */
  onDetails?: () => void;
}

export default function OrderCard({
  title = "Mesa 1",
  status = "Em produção",
  statusTone = "neutral",
  itemsCount = 0,
  itemsSummary = "",
  total = "R$ 0,00",
  detailsLabel = "Detalhes",
  onDetails,
}: OrderCardProps) {
  return (
    <article
      onClick={
        onDetails
          ? (event) => {
              // Keeps the focus on the button so a modal can give it back when it closes.
              event.currentTarget.querySelector("button")?.focus();
              onDetails();
            }
          : undefined
      }
      className={`flex h-48.5 w-full flex-col gap-3 rounded-2xl border border-line-subtle bg-surface p-5 shadow-sm transition-shadow hover:border-status-danger-border hover:shadow-md ${onDetails ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate text-body-lg font-bold text-fg-primary">{title}</h3>
        <Badge tone={statusTone}>{status}</Badge>
      </div>
      <div className="flex flex-col gap-1 text-body-md">
        <p className="text-fg-tertiary">Itens: {itemsCount}</p>
        <p className="truncate text-fg-secondary">{itemsSummary}</p>
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line-subtle pt-3">
        <div className="flex flex-col">
          <span className="text-body-sm text-fg-tertiary">Total</span>
          <span className="text-h3 font-bold text-fg-brand">{total}</span>
        </div>
        <Button variant="secondary" size="sm">
          {detailsLabel}
        </Button>
      </div>
    </article>
  );
}
