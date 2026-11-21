import type { BadgeTone } from "../../components/Badge";

export const ORDER_STATUS = {
  pending: { label: "Pendente", tone: "warning" },
  preparing: { label: "Em preparo", tone: "info" },
  ready: { label: "Pronto", tone: "success" },
  canceled: { label: "Cancelado", tone: "danger" },
} as const satisfies Record<string, { label: string; tone: BadgeTone }>;

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface Order {
  id: number;
  table: number;
  status: OrderStatus;
  itemsCount: number;
  itemsSummary: string;
  total: string;
}

/** Sample data: there is no backend yet. */
export const ORDERS: Order[] = [
  { id: 1, table: 1, status: "ready", itemsCount: 3, itemsSummary: "1× Coca-Cola Lata, 1× Pizza Calabresa, 1× Brownie", total: "R$ 79,00" },
  { id: 2, table: 4, status: "pending", itemsCount: 2, itemsSummary: "2× Hambúrguer Artesanal", total: "R$ 64,00" },
  { id: 3, table: 7, status: "preparing", itemsCount: 4, itemsSummary: "2× Pizza Marguerita, 2× Guaraná Lata", total: "R$ 112,00" },
  { id: 4, table: 2, status: "ready", itemsCount: 1, itemsSummary: "1× Porção de Batata Frita", total: "R$ 28,00" },
  { id: 5, table: 9, status: "canceled", itemsCount: 2, itemsSummary: "1× Suco de Laranja, 1× Salada Caesar", total: "R$ 42,00" },
  { id: 6, table: 3, status: "pending", itemsCount: 5, itemsSummary: "3× Chopp, 1× Tábua de Frios, 1× Pão de Alho", total: "R$ 137,50" },
  { id: 7, table: 12, status: "preparing", itemsCount: 2, itemsSummary: "1× Risoto de Cogumelos, 1× Água com Gás", total: "R$ 71,00" },
  { id: 8, table: 5, status: "ready", itemsCount: 3, itemsSummary: "2× Espetinho Misto, 1× Farofa", total: "R$ 54,00" },
  { id: 9, table: 8, status: "pending", itemsCount: 1, itemsSummary: "1× Lasanha à Bolonhesa", total: "R$ 48,00" },
  { id: 10, table: 6, status: "preparing", itemsCount: 3, itemsSummary: "1× Pizza Calabresa, 2× Coca-Cola Lata", total: "R$ 69,00" },
  { id: 11, table: 10, status: "canceled", itemsCount: 1, itemsSummary: "1× Torta de Limão", total: "R$ 18,00" },
  { id: 12, table: 11, status: "ready", itemsCount: 4, itemsSummary: "2× Hambúrguer Artesanal, 2× Milkshake", total: "R$ 98,00" },
  { id: 13, table: 14, status: "pending", itemsCount: 2, itemsSummary: "1× Executivo de Frango, 1× Suco de Uva", total: "R$ 39,00" },
  { id: 14, table: 15, status: "preparing", itemsCount: 6, itemsSummary: "3× Pastel de Carne, 3× Caldo de Cana", total: "R$ 66,00" },
];
