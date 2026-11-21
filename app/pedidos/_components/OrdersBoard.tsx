"use client";

import { useEffect, useState } from "react";
import { ORDERS } from "../_data/orders";
import type { OrderStatus } from "../_data/orders";
import OrdersFilters from "./OrdersFilters";
import OrdersList from "./OrdersList";

type Filter = "all" | OrderStatus;

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendentes" },
  { value: "preparing", label: "Em Preparo" },
  { value: "ready", label: "Prontos" },
  { value: "canceled", label: "Cancelados" },
];

export default function OrdersBoard() {
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  // Sample behavior: simulates loading the orders.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const orders = filter === "all" ? ORDERS : ORDERS.filter((order) => order.status === filter);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <OrdersFilters
        options={FILTER_OPTIONS}
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      />
      {/* key resets the page back to 1 whenever the filter changes */}
      <OrdersList key={filter} orders={orders} loading={loading} />
    </div>
  );
}
