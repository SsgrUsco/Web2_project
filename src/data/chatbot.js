import { shopCategories } from './catalog.js';
import { formatPrice } from './menu.js';
import { business } from './business.js';

const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const menuAction = { label: 'Explorar menú', href: '#/compras' };

export function getChatReply(message, cart = [], catalog = [], catalogStatus = 'ready') {
  const text = normalize(message);
  if (/carrito|pedido|pagar|compra/.test(text)) {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    return {
      text: count
        ? `Tienes ${count} ${count === 1 ? 'producto' : 'productos'} en tu carrito. Total: ${formatPrice(total)}. Puedes revisar las cantidades y continuar con tu compra desde allí.`
        : 'Tu carrito está vacío. Explora el menú y agrega lo que más te guste.',
      action: count ? { label: 'Ver mi carrito', type: 'cart' } : menuAction,
    };
  }
  if (/horario|abren|cierran|abierto/.test(text)) {
    return { text: `${business.days}: ${business.hours}.`, action: { label: 'Conócenos', href: '#/nosotros' } };
  }
  if (/ubicacion|direccion|donde|contacto|telefono/.test(text)) {
    return { text: `Estamos en ${business.city}. Dirección: ${business.address}. Teléfono: ${business.phone}. Correo: ${business.email}.`, action: { label: 'Conócenos', href: '#/nosotros' } };
  }
  if (/domicilio|envio|entrega/.test(text)) {
    return { text: 'Consulta las opciones de entrega a través de nuestros canales de contacto.', action: { label: 'Conócenos', href: '#/nosotros' } };
  }
  const groups = [
    ['hamburgues', 'Hamburguesas'], ['perro', 'Perros calientes'],
    ['salchipapa', 'Salchipapas'], ['frito', 'Fritos'], ['empanada', 'Fritos'],
    ['bebida', 'Bebidas'], ['jugo', 'Bebidas'], ['gaseosa', 'Bebidas'],
    ['limonada', 'Bebidas'], ['combo', 'Combos'],
  ];
  const category = groups.find(([keyword]) => text.includes(keyword))?.[1];
  if (category) {
    if (catalogStatus !== 'ready') {
      return { text: catalogStatus === 'loading' ? 'Estoy consultando los productos. Inténtalo en unos segundos.' : 'No pude consultar los productos. Abre el menú para volver a intentar.', action: menuAction };
    }
    const products = catalog.filter(product => product.category === category);
    return {
      text: products.length ? `${category} en nuestro menú:\n${products.map(product => `• ${product.name}: ${formatPrice(product.price)}`).join('\n')}` : `No hay productos disponibles en ${category.toLowerCase()} en este momento.`,
      action: { label: `Ver ${category.toLowerCase()}`, href: `#/compras?categoria=${encodeURIComponent(category)}` },
    };
  }
  if (/menu|precio|comida|opciones|recomienda/.test(text)) {
    return { text: `Puedes elegir entre ${shopCategories.join(', ')}. Escribe una categoría para consultar sus productos y precios.`, action: menuAction };
  }
  if (/\b(hola|buenas|buenos|hey)\b/.test(text)) {
    return { text: '¡Hola! Soy el asistente de Burger Zone. ¿Qué se te antoja hoy? Puedo ayudarte con el menú, tu carrito o información del local.' };
  }
  if (/gracias/.test(text)) return { text: '¡Con gusto! Estoy aquí si necesitas ayuda con el menú.' };
  return { text: 'Puedo ayudarte con el menú, precios, carrito, horarios y ubicación. Prueba con “hamburguesas” o elige una de las preguntas rápidas.', action: menuAction };
}

