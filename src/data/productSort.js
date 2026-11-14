import { shopCategories } from './catalog.js';

const categoryOrder = new Map(shopCategories.map((name, index) => [name, index]));
export const sortOptions = [
  { value: 'category', label: 'Categorías' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A–Z' },
  { value: 'name-desc', label: 'Nombre: Z–A' },
];

export function sortProducts(products, order) {
  return [...products].sort((a, b) => {
    if (order === 'price-asc') return a.price - b.price;
    if (order === 'price-desc') return b.price - a.price;
    if (order === 'name-asc') return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    if (order === 'name-desc') return b.name.localeCompare(a.name, 'es', { sensitivity: 'base' });
    return (categoryOrder.get(a.category) ?? shopCategories.length)
      - (categoryOrder.get(b.category) ?? shopCategories.length);
  });
}
