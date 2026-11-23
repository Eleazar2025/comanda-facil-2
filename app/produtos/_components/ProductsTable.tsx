"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LuPackage, LuPencil, LuTrash2 } from "react-icons/lu";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";
import IconButton from "../../components/IconButton";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import type { TableColumn } from "../../components/Table";
import Toggle from "../../components/Toggle";
import { formatCurrency } from "../../pedidos/_data/orders";
import type { Product } from "../_data/products";
import ProductsTableSkeleton from "./ProductsTableSkeleton";

// Heights in px (table header h-10, row h-17 + 1px border) used to count how many rows fit.
const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 69;
/** On mobile the page scrolls, so more rows go in a single page. */
const MOBILE_PER_PAGE = 8;

interface ProductsTableProps {
  products: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onToggleAvailable: (product: Product, available: boolean) => void;
  onDelete: (product: Product) => void;
}

export default function ProductsTable({
  products,
  loading = false,
  onEdit,
  onToggleAvailable,
  onDelete,
}: ProductsTableProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState(MOBILE_PER_PAGE);
  const [page, setPage] = useState(1);

  // On large screens, shows only as many rows as fit in the visible area (no scrolling).
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
      setPerPage(Math.max(1, Math.floor((area.clientHeight - HEADER_HEIGHT) / ROW_HEIGHT)));
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

  const columns: TableColumn<Product>[] = [
    {
      header: "Nome",
      cell: (product) => (
        <div className="flex flex-col items-start gap-1">
          {product.name}
          <span className="sm:hidden">
            <Badge>{product.category}</Badge>
          </span>
        </div>
      ),
    },
    {
      header: "Preço",
      cell: (product) => <span className="text-fg-brand">{formatCurrency(product.price)}</span>,
    },
    {
      header: "Categoria",
      hiddenOnMobile: true,
      cell: (product) => <Badge>{product.category}</Badge>,
    },
    {
      header: "Disponível",
      cell: (product) => (
        <Toggle
          key={String(product.available)}
          label={`Disponibilidade de ${product.name}`}
          defaultChecked={product.available}
          onChange={(available) => onToggleAvailable(product, available)}
        />
      ),
    },
    {
      header: "Ações",
      align: "right",
      cell: (product) => (
        <div className="flex items-center justify-end gap-1">
          <IconButton
            icon={LuPencil}
            label={`Editar ${product.name}`}
            onClick={() => onEdit(product)}
          />
          <IconButton
            icon={LuTrash2}
            tone="danger"
            label={`Excluir ${product.name}`}
            onClick={() => onDelete(product)}
          />
        </div>
      ),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div ref={areaRef} className="min-h-0 flex-1">
        {loading ? (
          <ProductsTableSkeleton rows={perPage} />
        ) : visibleProducts.length === 0 ? (
          <div className="animate-fade-up">
            <EmptyState
              icon={LuPackage}
              title="Nenhum produto cadastrado"
              description="Adicione produtos para montar o cardápio."
            />
          </div>
        ) : (
          <div key={currentPage} className="animate-fade-up">
            <Table
              label="Produtos do cardápio"
              columns={columns}
              rows={visibleProducts}
              getRowKey={(product) => String(product.id)}
            />
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
