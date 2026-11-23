"use client";

import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import MaskedInput from "../../components/MaskedInput";
import Toggle from "../../components/Toggle";
import { CATEGORIES } from "../_data/products";
import type { Product } from "../_data/products";

interface ProductFormProps {
  /** Product being edited. Without it, the form starts empty (new product). */
  product?: Product | null;
  submitLabel?: string;
  onSubmit: (product: Omit<Product, "id">) => void;
}

export default function ProductForm({
  product = null,
  submitLabel = "Adicionar Produto",
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? (product.price / 100).toFixed(2) : "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [available, setAvailable] = useState(product?.available ?? true);

  const canSubmit = name.trim() !== "" && price !== "" && category !== "";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit) return;
        onSubmit({
          name: name.trim(),
          price: Math.round(parseFloat(price) * 100),
          category,
          available,
        });
      }}
      className="flex flex-col gap-5"
    >
      <Input
        label="Nome do Produto"
        name="name"
        placeholder="Ex.: Pizza Margherita"
        autoComplete="off"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <MaskedInput
        mask="valor"
        label="Preço (R$)"
        name="price"
        defaultValue={price}
        onValueChange={setPrice}
      />
      <Dropdown
        label="Categoria"
        name="category"
        placeholder="Selecione a categoria"
        options={CATEGORIES}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-body-md font-semibold text-fg-secondary">Disponível</p>
          <p className="text-body-sm text-fg-tertiary">Produto visível no cardápio para pedidos</p>
        </div>
        <Toggle label="Produto disponível" defaultChecked={available} onChange={setAvailable} />
      </div>

      <Button type="submit" disabled={!canSubmit} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
