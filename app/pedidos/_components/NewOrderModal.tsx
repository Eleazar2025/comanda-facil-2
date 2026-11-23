"use client";

import { useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import useModalBehavior from "../_hooks/useModalBehavior";
import NewOrderForm from "./NewOrderForm";

const BACKDROP_STATE_STYLES = {
  open: "visible opacity-100",
  closed: "invisible opacity-0",
};

const DIALOG_STATE_STYLES = {
  open: "translate-y-0 opacity-100",
  closed: "translate-y-2 opacity-0",
};

interface NewOrderModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal to create an order. Stays mounted so opening and closing can fade and slide.
 * Closes with Esc, the close button or a click outside (see useModalBehavior for focus and scroll).
 */
export default function NewOrderModal({ open, onClose }: NewOrderModalProps) {
  const state = open ? "open" : "closed";
  const dialogRef = useModalBehavior(open, onClose);
  // Changing the key clears the form after an order is created.
  const [formKey, setFormKey] = useState(0);

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
        className={`max-h-dvh w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl transition-all ${DIALOG_STATE_STYLES[state]}`}
      >
        <ModalContainer title="Novo Pedido" closeLabel="Fechar" onClose={onClose}>
          <NewOrderForm
            key={formKey}
            onSubmit={() => {
              setFormKey((current) => current + 1);
              onClose();
            }}
          />
        </ModalContainer>
      </div>
    </div>
  );
}
