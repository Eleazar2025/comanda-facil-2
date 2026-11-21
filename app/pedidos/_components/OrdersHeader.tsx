"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import NewOrderModal from "./NewOrderModal";

export default function OrdersHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHeader title="Pedidos" description="Gerencie os pedidos da cozinha">
        <Button icon={LuPlus} onClick={() => setModalOpen(true)} className="w-full sm:w-auto">
          Novo Pedido
        </Button>
      </PageHeader>
      <NewOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
