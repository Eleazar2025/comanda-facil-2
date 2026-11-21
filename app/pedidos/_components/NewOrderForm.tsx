"use client";

import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import AccordionHeader from "../../components/AccordionHeader";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import IconButton from "../../components/IconButton";
import { MENU, TABLES } from "../_data/menu";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Sample starting state, matching the design: Mesa 3 with 3 items selected.
const INITIAL_TABLE = "3";
const INITIAL_QUANTITIES: Record<string, number> = { coke: 2, juice: 1 };
const INITIAL_EXPANDED: Record<string, boolean> = { drinks: true };

interface NewOrderFormProps {
  onSubmit: () => void;
}

export default function NewOrderForm({ onSubmit }: NewOrderFormProps) {
  const [table, setTable] = useState(INITIAL_TABLE);
  const [quantities, setQuantities] = useState(INITIAL_QUANTITIES);
  const [expanded, setExpanded] = useState(INITIAL_EXPANDED);

  const allItems = MENU.flatMap((category) => category.items);
  const itemsCount = allItems.reduce((sum, item) => sum + (quantities[item.id] ?? 0), 0);
  const total = allItems.reduce((sum, item) => sum + item.price * (quantities[item.id] ?? 0), 0);

  function changeQuantity(id: string, delta: number) {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) }));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <Dropdown
        label="Selecionar Mesa"
        name="table"
        options={TABLES}
        value={table}
        onChange={(event) => setTable(event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <p className="text-body-md font-semibold text-fg-secondary">Itens do Cardápio</p>

        {MENU.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-line-subtle bg-canvas"
          >
            <AccordionHeader
              title={category.title}
              itemCount={category.items.length}
              defaultExpanded={expanded[category.id] ?? false}
              onToggle={(isExpanded) =>
                setExpanded((current) => ({ ...current, [category.id]: isExpanded }))
              }
            />
            {expanded[category.id] ? (
              <ul className="animate-fade-up flex flex-col gap-1 px-3 pb-3">
                {category.items.map((item) => {
                  const quantity = quantities[item.id] ?? 0;
                  return (
                    <li key={item.id} className="flex items-center gap-3">
                      <span className="min-w-0 flex-1 truncate text-body-md text-fg-primary">
                        {item.name}
                      </span>
                      <span className="text-body-md text-fg-secondary">
                        {currency.format(item.price)}
                      </span>
                      <div className="flex items-center gap-1">
                        <IconButton
                          icon={LuMinus}
                          label={`Remover ${item.name}`}
                          disabled={quantity === 0}
                          onClick={() => changeQuantity(item.id, -1)}
                        />
                        <span
                          aria-live="polite"
                          className={`w-6 text-center text-body-md font-semibold ${quantity > 0 ? "text-fg-brand" : "text-fg-tertiary"}`}
                        >
                          {quantity}
                        </span>
                        <IconButton
                          icon={LuPlus}
                          label={`Adicionar ${item.name}`}
                          onClick={() => changeQuantity(item.id, 1)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-line-subtle bg-canvas px-4 py-3 text-body-md">
        <span className="text-fg-secondary">
          {itemsCount} {itemsCount === 1 ? "item selecionado" : "itens selecionados"}
        </span>
        <span className="text-fg-tertiary">
          Total: <strong className="text-body-lg font-bold text-fg-brand">{currency.format(total)}</strong>
        </span>
      </div>

      <Button type="submit" disabled={itemsCount === 0 || !table} className="w-full">
        Criar Pedido
      </Button>
    </form>
  );
}
