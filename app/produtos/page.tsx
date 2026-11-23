import type { Metadata } from "next";
import PanelShell from "../components/PanelShell";
import ProductsBoard from "./_components/ProductsBoard";

export const metadata: Metadata = {
  title: "Produtos | Comanda Fácil",
};

export default function ProductsPage() {
  return (
    <PanelShell activeHref="/produtos">
      <div className="animate-fade-up flex min-h-0 flex-1 flex-col gap-6">
        <ProductsBoard />
      </div>
    </PanelShell>
  );
}
