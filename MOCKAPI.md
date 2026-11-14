# Catálogo de Burger Zone

Recurso: https://6af5fc3ff6270fa08d68f897.mockapi.io/api/v1/productos

El catálogo se consulta con GET al iniciar la aplicación. `useCatalog` comparte el resultado entre el menú, los combos de la portada y el chatbot. La navegación no vuelve a descargarlo. Recarga la página para ver los cambios realizados en MockAPI.

## Campos

- `id`: identificador automático de MockAPI.
- `name`, `description`, `image`: textos; image debe ser una URL HTTP o HTTPS.
- `price`: número en pesos colombianos, sin símbolo ni separadores de miles.
- `category`: Hamburguesas, Perros calientes, Salchipapas, Fritos, Bebidas o Combos.
- `subcategory`: para Bebidas, Jugos naturales, Gaseosas o Limonadas. En otras categorías, cadena vacía.

Los extras y preferencias se calculan en `src/data/productOptions.js`. El carrito guarda una copia del producto y sus opciones al agregarlo. No se guardan pagos ni datos personales en esta API.

## Archivos

- `src/services/products.js`: URL, consulta y validación de respuesta.
- `src/hooks/useCatalog.js`: carga, cancelación, tiempo límite y reintento.
- `src/components/CatalogStatus.jsx`: estados de carga y error.

No se reemplaza un error de red con productos locales. Un catálogo vacío también se respeta.
Para cambiar de recurso se puede definir `VITE_PRODUCTS_API_URL` en `.env.local` y reiniciar Vite. Esta URL es pública, no una contraseña.

## Comprobación

En las herramientas de desarrollador del navegador, abre Red/Network, filtra por `productos` y recarga. La respuesta debe ser el catálogo de MockAPI. Si React StrictMode cancela una primera solicitud en desarrollo, la siguiente debe completarse.
