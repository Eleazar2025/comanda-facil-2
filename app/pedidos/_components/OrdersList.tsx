"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import EmptyState from "../../components/EmptyState";
import OrderCard from "../../components/OrderCard";
import Pagination from "../../components/Pagination";
import { ORDER_STATUS } from "../_data/orders";
import type { Order } from "../_data/orders";
import OrderCardSkeleton from "./OrderCardSkeleton";

// Card size (w-71.25 × h-48.5) and grid gap (gap-4), in px, used to count how many cards fit.
const CARD_WIDTH = 285;
const CARD_HEIGHT = 194;
const GAP = 16;
/** On mobile the page scrolls, so more items go in a single column. */
const MOBILE_PER_PAGE = 6;

interface OrdersListProps {
  orders: Order[];
  loading?: boolean;
}

export default function OrdersList({ orders, loading = false }: OrdersListProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState(MOBILE_PER_PAGE);
  const [page, setPage] = useState(1);

  // On large screens, shows only as many cards as fit in the visible area (no scrolling).
  useLayoutEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const desktop = window.matchMedia("(min-width: 768px)");

    function update() {
      if (!area) return;
      if (!desktop.matches) {
        setPerPage(MOBILE_PER_PAGE);
        return;
      }
      const columns = Math.max(1, Math.floor((area.clientWidth + GAP) / (CARD_WIDTH + GAP)));
      const rows = Math.max(1, Math.floor((area.clientHeight + GAP) / (CARD_HEIGHT + GAP)));
      setPerPage(columns * rows);
    }

    update();
    const observer = new ResizeObserver(update);
    observer.observe(area);
    desktop.addEventListener("change", update);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", update);
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(orders.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visibleOrders = orders.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div ref={areaRef} className="min-h-0 flex-1">
        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(--spacing(71.25),1fr))] gap-4">
            {Array.from({ length: perPage }, (_, index) => (
              <OrderCardSkeleton key={index} />
            ))}
          </div>
        ) : visibleOrders.length === 0 ? (
          <div className="animate-fade-up">
            <EmptyState
              icon={LuClipboardList}
              title="Nenhum pedido encontrado"
              description="Não há pedidos com este status no momento."
            />
          </div>
        ) : (
          <div
            key={currentPage}
            className="animate-fade-up grid grid-cols-[repeat(auto-fill,minmax(--spacing(71.25),1fr))] gap-4"
          >
            {visibleOrders.map((order) => (
              <OrderCard
                key={order.id}
                title={`Mesa ${order.table}`}
                status={ORDER_STATUS[order.status].label}
                statusTone={ORDER_STATUS[order.status].tone}
                itemsCount={order.itemsCount}
                itemsSummary={order.itemsSummary}
                total={order.total}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex min-h-8 justify-center">
        {!loading && totalPages > 1 ? (
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        ) : null}
      </div>
    </div>
  );
}
