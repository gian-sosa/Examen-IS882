# NovaStore - Catálogo Web Dinámico (Examen Laboratorio IS-882 Nº 07)

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
