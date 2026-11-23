import type { Metadata } from "next";
import OrdersBoard from "./_components/OrdersBoard";
import OrdersHeader from "./_components/OrdersHeader";
import PanelShell from "../components/PanelShell";

export const metadata: Metadata = {
  title: "Pedidos | Comanda Fácil",
};

export default function OrdersPage() {
  return (
    <PanelShell activeHref="/pedidos">
      <div className="animate-fade-up flex min-h-0 flex-1 flex-col gap-6">
        <OrdersHeader />
        <OrdersBoard />
      </div>
    </PanelShell>
  );
}
