import { formatPrice } from './menu.js';
import { business } from './business.js';

const normalize = value => String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const menu = { label: 'Explorar menú', href: '#/compras' };
const contact = { label: 'Ver contacto', href: '#/contacto' };
const groups = [[/hamburgues/, 'Hamburguesas'], [/perro|hot dog/, 'Perros calientes'], [/salchipapa/, 'Salchipapas'], [/frito|empanada|arepa|papa rellena/, 'Fritos'], [/bebida|jugo|gaseosa|limonada/, 'Bebidas'], [/combo/, 'Combos']];
const categoryFor = text => groups.find(([pattern]) => pattern.test(text))?.[1];
const actionFor = category => category ? { label: `Ver ${category.toLowerCase()}`, href: `#/compras?categoria=${encodeURIComponent(category)}` } : menu;

export function getChatReply(message, cart = [], catalog = [], catalogStatus = 'ready', history = []) {
  const text = normalize(message);
  const previous = [...history].reverse().find(item => item.role === 'user' && categoryFor(normalize(item.text)));
  const category = categoryFor(text) || (/^(y |¿?y |cual|¿?cual)|mas barat|otra opcion/.test(text) && previous ? categoryFor(normalize(previous.text)) : undefined);
  if (/alerg|celiac|gluten|intoleran|sin lactosa|vegan|vegetarian/.test(text)) return { text: 'Puedo mostrarte los ingredientes, pero no tengo información confirmada sobre alérgenos ni contaminación cruzada. Consulta con el local antes de elegir una opción para tus necesidades.', action: contact };
  if (/cancelar|reembolso|estado.*pedido|pedido.*estado|donde.*pedido/.test(text)) return { text: 'No tengo acceso al seguimiento ni puedo cancelar pedidos desde aquí. Contacta al local para revisar tu compra.', action: contact };
  if (/domicilio|envio|entrega|recoger|recogida/.test(text)) return { text: 'En el checkout puedes elegir recoger en el local o pedir a domicilio. Para domicilio se solicita barrio y dirección; el costo se confirma según la dirección. Consulta con el local la cobertura y el tiempo de entrega.', action: contact };
  if (/pagar|pago|tarjeta|efectivo|cvv|visa|mastercard/.test(text)) return { text: 'Puedes elegir efectivo al recibir. La opción de tarjeta aparece en el checkout, pero el pago en línea aún no está habilitado. No compartas datos de tarjeta ni códigos de seguridad en este chat.', action: cart.length ? { label: 'Ir al checkout', href: '#/checkout' } : menu };
  if (/carrito|mi pedido|mi compra|total/.test(text)) {
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    return { text: cart.length ? `Así va tu pedido:\n${cart.slice(0, 4).map(item => `• ${item.qty} × ${item.name}`).join('\n')}${cart.length > 4 ? '\n• Y más productos en tu carrito.' : ''}\n\nSubtotal: ${formatPrice(total)}. Puedes ajustar cantidades y continuar al checkout desde el carrito.` : 'Tu carrito está vacío. Elige algo del menú y podrás revisar aquí tus productos y el subtotal.', action: cart.length ? { label: 'Ver mi carrito', type: 'cart' } : menu };
  }
  if (/horario|abren|cierran|abierto|hora.*cerr|hora.*abr/.test(text)) return { text: `Nuestro horario publicado es de ${business.days.toLowerCase()}, de ${business.hours}. Para confirmar la atención de hoy, contacta al local.`, action: contact };
  if (/ubicacion|direccion|donde|contacto|telefono|correo|whatsapp/.test(text)) return { text: `Estamos en ${business.address}, ${business.city}.\n\nTeléfono: ${business.phone}\nCorreo: ${business.email}`, action: contact };
  if (/extra|quitar|personaliz|sin cebolla|sin tomate|sin salsa/.test(text)) return { text: 'Abre los detalles del producto para ver sus ingredientes, agregar extras y usar “¿Lo prefieres sin algo?”. El precio se actualiza antes de agregarlo al carrito.', action: actionFor(category) };
  const match = text.match(/(?:presupuesto(?: de)?|tengo|hasta|menos de|maximo|con)\s*\$?\s*(\d[\d.,]*)(?:\s*(mil|k))?/);
  const budget = match ? Number(match[1].replace(/[.,]/g, '')) * (match[2] ? 1000 : 1) : null;
  const cheap = /barat|econom|menor precio/.test(text);
  const recommend = /recom|sugier|sugeren|antojo|compartir|hambre/.test(text);
  const exact = [...catalog].sort((a, b) => b.name.length - a.name.length).find(product => text.includes(normalize(product.name)));
  const ingredient = ['pollo', 'tocineta', 'champiñones', 'bbq', 'mango', 'mora', 'maracuyá', 'lulo', 'coco', 'hierbabuena'].find(word => text.includes(normalize(word)));
  if (category || exact || ingredient || budget !== null || cheap || recommend || /menu|precio|cuesta|vale|comida|opciones|ingrediente|tienen/.test(text)) {
    if (catalogStatus !== 'ready') return { text: catalogStatus === 'loading' ? 'El catálogo está cargando. Pregúntame de nuevo en unos segundos para consultar los precios.' : 'No pude consultar el catálogo. Abre el menú y pulsa reintentar; prefiero no darte precios desactualizados.', action: menu };
    if (exact && !cheap && budget === null && !recommend) return { text: `${exact.name} · ${formatPrice(exact.price)}\n\n${exact.description}\n\nAbre sus detalles para personalizarlo y agregarlo al carrito.`, action: actionFor(exact.category) };
    let options = catalog.filter(product => !category || product.category === category);
    const drink = ['jugo', 'gaseosa', 'limonada'].find(word => text.includes(word));
    if (drink) options = options.filter(product => normalize(product.name).includes(drink));
    if (ingredient) options = options.filter(product => normalize(`${product.name} ${product.description}`).includes(normalize(ingredient)));
    if (!category && /compartir|familia|pareja/.test(text)) options = options.filter(product => product.category === 'Combos');
    if (budget !== null) options = options.filter(product => product.price <= budget);
    if (cheap || budget !== null) options = [...options].sort((a, b) => a.price - b.price);
    if (!options.length) return { text: 'No encontré opciones que coincidan. Prueba otra categoría o un presupuesto diferente.', action: actionFor(category) };
    if (!category && !ingredient && !recommend && !cheap && budget === null) return { text: 'Tenemos hamburguesas, perros calientes, salchipapas, fritos, combos y bebidas. Dime qué te gusta o cuánto quieres gastar: por ejemplo, “combos hasta 30 mil” o “hamburguesas de pollo”.', action: menu };
    const selected = options.slice(0, cheap ? 1 : 3);
    return { text: `${cheap ? 'La opción más económica de esta selección es:' : budget !== null ? `Estas opciones cuestan hasta ${formatPrice(budget)} por producto:` : 'Estas opciones pueden gustarte:'}\n\n${selected.map(product => `• ${product.name} — ${formatPrice(product.price)}`).join('\n')}\n\n${options.length > selected.length ? 'Hay más opciones en el menú. ' : ''}Abre los detalles para consultar ingredientes y extras.`, action: actionFor(category) };
  }
  if (/\b(hola|buenas|buenos|hey)\b/.test(text)) return { text: '¡Hola! ¿Qué se te antoja hoy? Puedo recomendarte algo por categoría o presupuesto, consultar precios y ayudarte con tu carrito.' };
  if (/gracias|perfecto|genial/.test(text)) return { text: '¡Con gusto! Si aún estás eligiendo, dime qué te gusta y buscamos una opción.' };
  if (/adios|hasta luego|chao/.test(text)) return { text: '¡Hasta pronto! Aquí estaré cuando vuelva el antojo.' };
  return { text: 'No alcancé a identificar tu consulta. Prueba con “hamburguesas de pollo”, “combos hasta 30 mil”, “mi carrito” o “¿cómo pido a domicilio?”.', action: menu };
}
