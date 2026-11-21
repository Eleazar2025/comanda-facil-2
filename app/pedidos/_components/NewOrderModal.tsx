"use client";

import { useEffect, useRef, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import NewOrderForm from "./NewOrderForm";

const FOCUSABLE_SELECTOR =
  'a[href], button:not(:disabled), input:not([type="hidden"]):not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

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
 * Closes with Esc, the close button or a click outside; traps the keyboard focus while open,
 * locks the page scroll, and gives the focus back to the element that opened it.
 */
export default function NewOrderModal({ open, onClose }: NewOrderModalProps) {
  const state = open ? "open" : "closed";
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  // Changing the key clears the form after an order is created.
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    focusable()[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !(active instanceof Node) || !dialog?.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

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
