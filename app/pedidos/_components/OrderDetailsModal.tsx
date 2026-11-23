"use client";

import { useState } from "react";
import { LuFlame, LuPencil } from "react-icons/lu";
import Button from "../../components/Button";
import ModalContainer from "../../components/ModalContainer";
import { formatCurrency, getOrderTotal } from "../_data/orders";
import type { Order } from "../_data/orders";
import useModalBehavior from "../_hooks/useModalBehavior";

const BACKDROP_STATE_STYLES = {
  open: "visible opacity-100",
  closed: "invisible opacity-0",
};

const DIALOG_STATE_STYLES = {
  open: "translate-y-0 opacity-100",
  closed: "translate-y-2 opacity-0",
};

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

/**
 * Order details modal. Stays mounted so opening and closing can fade and slide.
 * Opens when `order` is set. Closes with Esc, the close button or a click outside.
 */
export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  const open = order !== null;
  const state = open ? "open" : "closed";
  const dialogRef = useModalBehavior(open, onClose);

  // Keeps the last order on screen while the closing transition runs.
  const [shown, setShown] = useState(order);
  if (order && order !== shown) setShown(order);

  const total = shown ? formatCurrency(getOrderTotal(shown)) : "";

  return (
    <div
      inert={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-fg-primary/40 transition-opacity md:p-4 ${BACKDROP_STATE_STYLES[state]}`}
    >
      <div
        ref={dialogRef}
        className={`flex max-h-dvh w-full justify-center overflow-y-auto overscroll-contain rounded-2xl transition-all ${DIALOG_STATE_STYLES[state]}`}
      >
        {shown ? (
          <ModalContainer size="compact" title="Detalhes do Pedido" onClose={onClose}>
            <div className="flex flex-col gap-3">
              <p className="rounded-lg bg-input px-4 py-3 font-bold text-fg-primary">
                Mesa {shown.table}
              </p>
              <p>
                Garçom: <span className="text-fg-secondary">{shown.waiter}</span>
              </p>

              <div className="flex flex-col gap-2">
                <h3 className="text-body-sm font-semibold tracking-wide text-fg-tertiary uppercase">
                  Itens do pedido
                </h3>
                <ul className="flex flex-col gap-2 text-fg-primary">
                  {shown.items.map((item) => (
                    <li key={item.name} className="flex justify-between gap-2">
                      <span>
                        <span className="text-fg-brand">{item.quantity}×</span> {item.name}
                      </span>
                      <span className="shrink-0">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="flex flex-col gap-2 border-t border-line-subtle pt-3">
                <div className="flex justify-between gap-2">
                  <dt>Subtotal</dt>
                  <dd>{total}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 font-bold text-fg-primary">
                  <dt>Total Geral</dt>
                  <dd className="text-h3 text-fg-brand">{total}</dd>
                </div>
              </dl>

              <div className="flex flex-col gap-3">
                <Button variant="secondary" size="sm" icon={LuPencil} className="w-full">
                  Editar Pedido
                </Button>
                <Button
                  size="sm"
                  icon={LuFlame}
                  className="w-full"
                  disabled={shown.status !== "pending"}
                >
                  Iniciar Preparo
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full"
                  disabled={shown.status === "ready" || shown.status === "canceled"}
                >
                  Marcar como Pronto
                </Button>
              </div>
              <p className="text-center text-body-sm text-fg-tertiary">
                Pedido recebido às {shown.receivedAt}
              </p>
            </div>
          </ModalContainer>
        ) : null}
      </div>
    </div>
  );
}
