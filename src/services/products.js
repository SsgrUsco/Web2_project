export const PRODUCTS_API_URL = import.meta.env?.VITE_PRODUCTS_API_URL
  || 'https://6af5fc3ff6270fa08d68f897.mockapi.io/api/v1/productos';

export function normalizeProducts(data) {
  if (!Array.isArray(data)) throw new Error('El catálogo no tiene un formato válido.');
  const ids = new Set();
  return data.map(item => {
    if (!item || !['string', 'number'].includes(typeof item.id)
      || typeof item.name !== 'string' || !item.name.trim()
      || typeof item.category !== 'string' || !item.category.trim()
      || typeof item.image !== 'string' || !(/^https?:\/\//i.test(item.image) || /^\/images\/products\/[a-z0-9-]+\.(png|webp)$/.test(item.image))
      || !['number', 'string'].includes(typeof item.price) || String(item.price).trim() === '') {
      throw new Error('Hay un producto con datos incompletos.');
    }
    const id = String(item.id).trim();
    const price = Number(item.price);
    if (!id || ids.has(id) || !Number.isFinite(price) || price < 0) {
      throw new Error('Hay un producto con un identificador o precio inválido.');
    }
    ids.add(id);
    return {
      id,
      name: item.name.trim(),
      description: typeof item.description === 'string' ? item.description.trim() : '',
      price,
      image: item.image.replace(/^(\/images\/products\/producto-\d{2})\.png$/, '$1.webp'),
      category: item.category.trim(),
      subcategory: typeof item.subcategory === 'string' ? item.subcategory.trim() : '',
    };
  });
}

export async function fetchProducts(signal) {
  const response = await fetch(PRODUCTS_API_URL, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`No se pudo consultar el catálogo (${response.status}).`);
  return normalizeProducts(await response.json());
}
