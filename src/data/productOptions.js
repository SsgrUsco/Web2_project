export function getProductOptions(product) {
  // Opciones y precios de ejemplo, compartidos por el menú y la landing.
  if (product.category === 'Bebidas') {
    return {
      sizes: [{ name: 'Personal', price: 0 }, { name: 'Grande', price: 2000 }],
      extras: product.subcategory === 'Jugos naturales'
        ? [{ name: 'Preparación en leche', price: 1500 }]
        : [{ name: 'Porción de limón aparte', price: 500 }],
      removable: product.subcategory === 'Gaseosas' ? ['Hielo'] : ['Hielo', 'Azúcar añadida'],
    };
  }

  if (product.category === 'Fritos') {
    return {
      sizes: [{ name: 'Estándar', price: 0 }],
      extras: [{ name: 'Porción de papas fritas', price: 4000 }, { name: 'Salsa de la casa aparte', price: 1000 }],
      removable: ['Ají de la casa'],
    };
  }

  const burger = product.category === 'Hamburguesas'
    || (product.category === 'Combos' && /hamburguesa/i.test(product.description));
  return {
    sizes: [{ name: 'Estándar', price: 0 }],
    extras: [{ name: 'Queso extra', price: 2000 }, { name: 'Tocineta extra', price: 3000 }],
    removable: burger
      ? ['Lechuga', 'Tomate', 'Salsa de la casa']
      : ['Queso', 'Salsas'],
  };
}

export function configureProduct(product, sizeIndex, extras, removed) {
  const options = getProductOptions(product);
  const size = options.sizes[sizeIndex] || options.sizes[0];
  const selectedExtras = options.extras.filter(extra => extras.includes(extra.name));
  const selectedRemoved = options.removable.filter(name => removed.includes(name));
  const customized = sizeIndex > 0 || selectedExtras.length > 0 || selectedRemoved.length > 0;
  return {
    ...product,
    id: customized ? `${product.id}:${JSON.stringify([size.name, selectedExtras.map(extra => extra.name), selectedRemoved])}` : product.id,
    price: product.price + size.price + selectedExtras.reduce((sum, extra) => sum + extra.price, 0),
    options: [
      ...(options.sizes.length > 1 ? [size.name] : []),
      ...selectedExtras.map(extra => extra.name),
      ...selectedRemoved.map(name => `Sin ${name.toLowerCase()}`),
    ].join(' · '),
  };
}
