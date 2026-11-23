"use client";

import { useEffect, useState } from "react";
import { PRODUCTS } from "../_data/products";
import type { Product } from "../_data/products";
import DeleteProductModal from "./DeleteProductModal";
import ProductFormModal from "./ProductFormModal";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";

export default function ProductsBoard() {
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  // Kept while the form closes, so the title does not change during the transition.
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Sample behavior: simulates loading the products.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  function openForm(product: Product | null) {
    setProductToEdit(product);
    setFormKey((current) => current + 1);
    setFormOpen(true);
  }

  function handleSubmit(values: Omit<Product, "id">) {
    if (productToEdit) {
      setProducts((current) =>
        current.map((item) => (item.id === productToEdit.id ? { ...item, ...values } : item)),
      );
      return;
    }
    setProducts((current) => [
      ...current,
      { ...values, id: Math.max(0, ...current.map((item) => item.id)) + 1 },
    ]);
  }

  function handleToggleAvailable(product: Product, available: boolean) {
    setProducts((current) =>
      current.map((item) => (item.id === product.id ? { ...item, available } : item)),
    );
  }

  function handleConfirmDelete() {
    if (!productToDelete) return;
    setProducts((current) => current.filter((product) => product.id !== productToDelete.id));
    setProductToDelete(null);
  }

  return (
    <>
      <ProductsHeader onNewProduct={() => openForm(null)} />
      <ProductsTable
        products={products}
        loading={loading}
        onEdit={openForm}
        onToggleAvailable={handleToggleAvailable}
        onDelete={setProductToDelete}
      />
      <ProductFormModal
        open={formOpen}
        product={productToEdit}
        resetKey={formKey}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />
      <DeleteProductModal
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onClose={() => setProductToDelete(null)}
      />
    </>
  );
}
