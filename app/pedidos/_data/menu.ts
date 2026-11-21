export interface MenuItem {
  id: string;
  name: string;
  /** Price in reais. */
  price: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

/** Sample data: there is no backend yet. */
export const MENU: MenuCategory[] = [
  {
    id: "drinks",
    title: "Bebidas",
    items: [
      { id: "coke", name: "Coca-Cola Lata", price: 6 },
      { id: "guarana", name: "Guaraná Lata", price: 5 },
      { id: "juice", name: "Suco Natural", price: 8 },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    items: [
      { id: "calabresa", name: "Pizza Calabresa", price: 52 },
      { id: "margherita", name: "Pizza Marguerita", price: 48 },
      { id: "portuguesa", name: "Pizza Portuguesa", price: 56 },
    ],
  },
  {
    id: "desserts",
    title: "Sobremesas",
    items: [
      { id: "brownie", name: "Brownie", price: 15 },
      { id: "pudding", name: "Pudim", price: 12 },
    ],
  },
];

export const TABLES = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1),
  label: `Mesa ${index + 1}`,
}));
