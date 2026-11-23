import type { BadgeTone } from "../../components/Badge";

export const ORDER_STATUS = {
  pending: { label: "Pendente", tone: "warning" },
  preparing: { label: "Em preparo", tone: "info" },
  ready: { label: "Pronto", tone: "success" },
  canceled: { label: "Cancelado", tone: "danger" },
} as const satisfies Record<string, { label: string; tone: BadgeTone }>;

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderItem {
  quantity: number;
  name: string;
  /** Unit price in cents. */
  unitPrice: number;
}

export interface Order {
  id: number;
  table: number;
  status: OrderStatus;
  waiter: string;
  receivedAt: string;
  items: OrderItem[];
}

export function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getOrderTotal(order: Order) {
  return order.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function getItemsCount(order: Order) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getItemsSummary(order: Order) {
  return order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ");
}

const COLA = { name: "Coca-Cola Lata", unitPrice: 600 };
const PIZZA = { name: "Pizza Frango c/ Catupiry", unitPrice: 3000 };
const CALABRESA = { name: "Pizza Calabresa", unitPrice: 3200 };
const BURGER = { name: "Hambúrguer Artesanal", unitPrice: 3200 };
const FRIES = { name: "Porção de Batata Frita", unitPrice: 2800 };

/** Sample data: there is no backend yet. */
export const ORDERS: Order[] = [
  { id: 1, table: 52, status: "pending", waiter: "Carlos Silva", receivedAt: "14:32", items: [{ quantity: 1, ...COLA }, { quantity: 1, ...PIZZA }] },
  { id: 2, table: 4, status: "pending", waiter: "Ana Souza", receivedAt: "14:40", items: [{ quantity: 2, ...BURGER }] },
  { id: 3, table: 7, status: "preparing", waiter: "Carlos Silva", receivedAt: "14:15", items: [{ quantity: 2, name: "Pizza Marguerita", unitPrice: 3400 }, { quantity: 2, name: "Guaraná Lata", unitPrice: 600 }] },
  { id: 4, table: 2, status: "ready", waiter: "Bruno Lima", receivedAt: "13:58", items: [{ quantity: 1, ...FRIES }] },
  { id: 5, table: 9, status: "canceled", waiter: "Ana Souza", receivedAt: "13:45", items: [{ quantity: 1, name: "Suco de Laranja", unitPrice: 1200 }, { quantity: 1, name: "Salada Caesar", unitPrice: 3000 }] },
  { id: 6, table: 3, status: "pending", waiter: "Bruno Lima", receivedAt: "14:44", items: [{ quantity: 3, name: "Chopp", unitPrice: 1400 }, { quantity: 1, name: "Tábua de Frios", unitPrice: 6500 }, { quantity: 1, name: "Pão de Alho", unitPrice: 1500 }] },
  { id: 7, table: 12, status: "preparing", waiter: "Carlos Silva", receivedAt: "14:20", items: [{ quantity: 1, name: "Risoto de Cogumelos", unitPrice: 5800 }, { quantity: 1, name: "Água com Gás", unitPrice: 800 }] },
  { id: 8, table: 5, status: "ready", waiter: "Ana Souza", receivedAt: "13:50", items: [{ quantity: 2, name: "Espetinho Misto", unitPrice: 2200 }, { quantity: 1, name: "Farofa", unitPrice: 800 }] },
  { id: 9, table: 8, status: "pending", waiter: "Bruno Lima", receivedAt: "14:47", items: [{ quantity: 1, name: "Lasanha à Bolonhesa", unitPrice: 4800 }] },
  { id: 10, table: 6, status: "preparing", waiter: "Carlos Silva", receivedAt: "14:25", items: [{ quantity: 1, ...CALABRESA }, { quantity: 2, ...COLA }] },
  { id: 11, table: 10, status: "canceled", waiter: "Ana Souza", receivedAt: "13:30", items: [{ quantity: 1, name: "Torta de Limão", unitPrice: 1800 }] },
  { id: 12, table: 11, status: "ready", waiter: "Bruno Lima", receivedAt: "13:55", items: [{ quantity: 2, ...BURGER }, { quantity: 2, name: "Milkshake", unitPrice: 1800 }] },
  { id: 13, table: 14, status: "pending", waiter: "Carlos Silva", receivedAt: "14:50", items: [{ quantity: 1, name: "Executivo de Frango", unitPrice: 3000 }, { quantity: 1, name: "Suco de Uva", unitPrice: 900 }] },
  { id: 14, table: 15, status: "preparing", waiter: "Ana Souza", receivedAt: "14:10", items: [{ quantity: 3, name: "Pastel de Carne", unitPrice: 1000 }, { quantity: 3, name: "Caldo de Cana", unitPrice: 1200 }] },
];
