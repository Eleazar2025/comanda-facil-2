export interface Product {
  id: number;
  name: string;
  /** Price in cents. */
  price: number;
  category: string;
  available: boolean;
}

export const CATEGORIES = ["Pizzas", "Bebidas", "Sobremesas", "Adicionais"].map((name) => ({
  value: name,
  label: name,
}));

export const PRODUCTS: Product[] = [
  { id: 1, name: "Coca-Cola Lata", price: 600, category: "Bebidas", available: true },
  { id: 2, name: "Pizza Calabresa", price: 4800, category: "Pizzas", available: true },
  { id: 3, name: "Pizza Margherita", price: 4500, category: "Pizzas", available: true },
  { id: 4, name: "Pizza Quatro Queijos", price: 5400, category: "Pizzas", available: false },
  { id: 5, name: "Pizza Portuguesa", price: 5200, category: "Pizzas", available: true },
  { id: 6, name: "Pizza Frango com Catupiry", price: 5000, category: "Pizzas", available: true },
  { id: 7, name: "Guaraná Lata", price: 600, category: "Bebidas", available: true },
  { id: 8, name: "Suco de Laranja", price: 900, category: "Bebidas", available: true },
  { id: 9, name: "Água Mineral", price: 400, category: "Bebidas", available: true },
  { id: 10, name: "Cerveja Long Neck", price: 1100, category: "Bebidas", available: false },
  { id: 11, name: "Pudim de Leite", price: 1200, category: "Sobremesas", available: true },
  { id: 12, name: "Petit Gâteau", price: 1800, category: "Sobremesas", available: true },
  { id: 13, name: "Pizza Doce de Chocolate", price: 4200, category: "Pizzas", available: true },
  { id: 14, name: "Borda Recheada", price: 1000, category: "Adicionais", available: true },
];
