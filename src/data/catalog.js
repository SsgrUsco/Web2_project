import { products, categories, drinks, combos } from './menu.js';

export const shopCategories = ['Todos', ...categories.map(({ name }) => name), 'Bebidas', 'Combos'];
export const beverageCategories = drinks;

const beverageProducts = [
  { id: 'jugo-mango', name: 'Jugo de mango', description: 'Jugo de mango en agua, vaso personal.', price: 6000, group: 0 },
  { id: 'jugo-mora', name: 'Jugo de mora', description: 'Jugo de mora en agua, vaso personal.', price: 6000, group: 0 },
  { id: 'gaseosa-cola', name: 'Gaseosa de cola', description: 'Gaseosa sabor cola, presentación personal.', price: 4000, group: 1 },
  { id: 'gaseosa-manzana', name: 'Gaseosa de manzana', description: 'Gaseosa sabor manzana, presentación personal.', price: 4000, group: 1 },
  { id: 'limonada-natural', name: 'Limonada natural', description: 'Limón y hielo, vaso personal.', price: 7000, group: 2 },
  { id: 'limonada-coco', name: 'Limonada de coco', description: 'Limonada cremosa de coco, vaso personal.', price: 8000, group: 2 },
].map(({ group, ...product }) => ({ ...product, image: drinks[group].image, category: 'Bebidas', subcategory: drinks[group].name }));

// Precios de ejemplo para los productos que aún no tenían precio definido.
export const catalog = [
  { ...products[0], category: 'Hamburguesas' },
  { ...products[1], category: 'Salchipapas' },
  { id: 'perro-1', name: 'Perro americano', description: 'Salchicha, queso, papas ripio y salsas de la casa.', price: 10000, image: categories[1].image, category: 'Perros calientes' },
  { id: 'frito-1', name: 'Empanadas', description: 'Porción de tres empanadas crujientes con ají de la casa.', price: 9000, image: categories[3].image, category: 'Fritos' },
  ...beverageProducts,
  ...combos.map(combo => ({ ...combo, category: 'Combos' })),
];
