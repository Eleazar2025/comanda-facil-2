import { LuPencil, LuTrash2 } from "react-icons/lu";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";
import IconButton from "../../components/IconButton";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import type { TableColumn } from "../../components/Table";
import Toggle from "../../components/Toggle";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

interface ProductRow {
  id: string;
  name: string;
  price: string;
  category: string;
  available: boolean;
}

const PRODUCTS: ProductRow[] = [
  { id: "1", name: "Coca-Cola Lata", price: "R$ 6,00", category: "Bebidas", available: true },
  { id: "2", name: "Pizza Calabresa", price: "R$ 48,00", category: "Pizzas", available: true },
];

const PRODUCT_COLUMNS: TableColumn<ProductRow>[] = [
  { header: "Nome", cell: (row) => row.name },
  {
    header: "Preço",
    cell: (row) => <span className="whitespace-nowrap text-fg-brand">{row.price}</span>,
  },
  { header: "Categoria", cell: (row) => <Badge>{row.category}</Badge> },
  {
    header: "Disponível",
    cell: (row) => (
      <Toggle label={`${row.name} disponível`} defaultChecked={row.available} />
    ),
  },
  {
    header: "Ações",
    align: "right",
    cell: (row) => (
      <div className="flex justify-end gap-1">
        <IconButton icon={LuPencil} label={`Editar ${row.name}`} />
        <IconButton icon={LuTrash2} label={`Excluir ${row.name}`} tone="danger" />
      </div>
    ),
  },
];

export default function DataSection() {
  return (
    <>
      <PreviewSection title="Badge">
        <PreviewVariant label='tone="neutral"'>
          <Badge tone="neutral">Em produção</Badge>
        </PreviewVariant>
        <PreviewVariant label='tone="success"'>
          <Badge tone="success">Concluído</Badge>
        </PreviewVariant>
        <PreviewVariant label='tone="warning"'>
          <Badge tone="warning">Pendente</Badge>
        </PreviewVariant>
        <PreviewVariant label='tone="danger"'>
          <Badge tone="danger">Cancelado</Badge>
        </PreviewVariant>
        <PreviewVariant label='tone="info"'>
          <Badge tone="info">Novo</Badge>
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="PageHeader">
        <PageHeader
          title="Pedidos em produção"
          description="Gerencie os pedidos da cozinha"
        />
      </PreviewSection>

      <PreviewSection title="Table">
        <PreviewVariant label="default" className="w-full">
          <Table
            label="Produtos"
            columns={PRODUCT_COLUMNS}
            rows={PRODUCTS}
            getRowKey={(row) => row.id}
          />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="EmptyState">
        <PreviewVariant label="default" className="w-full items-center">
          <EmptyState />
        </PreviewVariant>
      </PreviewSection>
    </>
  );
}
