"use client";

import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";
import useModalBehavior from "../../pedidos/_hooks/useModalBehavior";
import type { Product } from "../_data/products";

const BACKDROP_STATE_STYLES = {
  open: "visible opacity-100",
  closed: "invisible opacity-0",
};

const DIALOG_STATE_STYLES = {
  open: "translate-y-0 opacity-100",
  closed: "translate-y-2 opacity-0",
};

interface DeleteProductModalProps {
  product: Product | null;
  onConfirm: () => void;
  onClose: () => void;
}

/** Delete confirmation. Stays mounted so opening and closing can fade and slide. */
export default function DeleteProductModal({ product, onConfirm, onClose }: DeleteProductModalProps) {
  const open = product !== null;
  const state = open ? "open" : "closed";
  const dialogRef = useModalBehavior(open, onClose);

  // Keeps the last product on screen while the closing transition runs.
  const [shown, setShown] = useState(product);
  if (product && product !== shown) setShown(product);

  return (
    <div
      inert={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-fg-primary/40 p-4 transition-opacity ${BACKDROP_STATE_STYLES[state]}`}
    >
      <div
        ref={dialogRef}
        className={`flex w-full justify-center transition-all ${DIALOG_STATE_STYLES[state]}`}
      >
        <ConfirmationModal
          title="Excluir produto?"
          message={`"${shown?.name ?? ""}" será removido do cardápio.`}
          confirmLabel="Excluir"
          onConfirm={onConfirm}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
