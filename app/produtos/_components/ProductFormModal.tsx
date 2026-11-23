"use client";

import ModalContainer from "../../components/ModalContainer";
import useModalBehavior from "../../pedidos/_hooks/useModalBehavior";
import type { Product } from "../_data/products";
import ProductForm from "./ProductForm";

const BACKDROP_STATE_STYLES = {
  open: "visible opacity-100",
  closed: "invisible opacity-0",
};

const DIALOG_STATE_STYLES = {
  open: "translate-y-0 opacity-100",
  closed: "translate-y-2 opacity-0",
};

interface ProductFormModalProps {
  open: boolean;
  /** Product being edited; null to add a new one. */
  product?: Product | null;
  /** Changes on every opening, so the form starts fresh each time. */
  resetKey?: number;
  onSubmit: (product: Omit<Product, "id">) => void;
  onClose: () => void;
}

/**
 * Modal to add or edit a product. Stays mounted so opening and closing can fade and slide.
 * Closes with Esc, the close button or a click outside (see useModalBehavior for focus and scroll).
 */
export default function ProductFormModal({
  open,
  product = null,
  resetKey = 0,
  onSubmit,
  onClose,
}: ProductFormModalProps) {
  const state = open ? "open" : "closed";
  const dialogRef = useModalBehavior(open, onClose);
  const editing = product !== null;

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
        className={`max-h-dvh w-full max-w-125 overflow-y-auto overscroll-contain rounded-2xl transition-all ${DIALOG_STATE_STYLES[state]}`}
      >
        <ModalContainer
          size="wide"
          title={editing ? "Editar Produto" : "Novo Produto"}
          onClose={onClose}
        >
          <ProductForm
            key={resetKey}
            product={product}
            submitLabel={editing ? "Salvar Alterações" : "Adicionar Produto"}
            onSubmit={(values) => {
              onSubmit(values);
              onClose();
            }}
          />
        </ModalContainer>
      </div>
    </div>
  );
}
