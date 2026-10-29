# NovaStore - Catálogo Web Dinámico (Laboratorio IS-882 Nº 07)

## Ejecutar

1. Instala Node.js y npm (Vite requiere Node 20.19+ o 22.12+).
2. Abre esta carpeta en VS Code.
3. En la terminal: `npm install`.
4. Ejecuta: `npm run dev`.
5. Abre la URL local indicada por Vite (normalmente http://localhost:5173).
6. Para comprobar compilación: `npm run build`.

## Tecnologías
React + TypeScript + Vite + Axios + TanStack Query + React Router.

## API REST
- GET https://fakestoreapi.com/products
- GET https://fakestoreapi.com/products/{id}

## Desafíos implementados
1. Búsqueda con debouncing de 400ms: actualiza la consulta local y el parámetro `search` en la URL solamente cuando se deja de escribir.
2. Sincronización de búsqueda, categorías y página con la URL (`search`, `category`, `page`), compatible con historial atrás/adelante.

## Funcionalidades complementarias
- Paginación cliente de 8 productos por página (FakeStore no utiliza consulta de búsqueda remota en este proyecto).
- Gestión de peticiones y caché con TanStack Query; queryKeys de listado/detalle.
- Prefetch al pasar el cursor por las tarjetas.
- Detalle mediante ruta dinámica `/producto/:id`.
- Manejo de errores, páginas inexistentes y reintentos.
- Diseño responsive con CSS.

Nota: FakeStore API es una API de prueba; la paginación y búsqueda se hacen sobre la colección recuperada, no generan una solicitud HTTP por cada pulsación.

## Capturas sugeridas para el informe
1. `node -v` y `npm -v`.
2. Proyecto Vite generado.
3. Dependencias instaladas.
4. Estructura `src`.
5. `types/product.ts` y `api/products.ts`.
6. `hooks/useProducts.ts` y `main.tsx`.
7. `router.tsx`.
8. Catálogo cargado.
9. Búsqueda y `?search=`.
10. Categoría seleccionada y URL.
11. Paginación con `?page=2`.
12. Detalle `/producto/1`.
13. Error en `/producto/999` y ruta `/no-existe`.
14. Vista móvil desde herramientas de desarrollador.
15. `npm run build` exitoso.
