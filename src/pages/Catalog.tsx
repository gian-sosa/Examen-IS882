import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const PAGE_SIZE = 8;

export function Catalog() {
  const { data: products = [], isPending, isError, refetch } = useProducts();
  const [params, setParams] = useSearchParams();
  const searchFromUrl = params.get('search') ?? '';
  const category = params.get('category') ?? 'all';
  const rawPage = Number(params.get('page') ?? 1);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const [searchText, setSearchText] = useState(searchFromUrl);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Permite recuperar la búsqueda al volver/avanzar en el historial.
  useEffect(() => {
    setSearchText(searchFromUrl);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, [searchFromUrl]);

  useEffect(() => () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, []);

  // DESAFÍO 1: debouncing; solo actualiza tras 400 ms sin escribir.
  const handleSearch = (value: string) => {
    setSearchText(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setParams(previous => {
        const next = new URLSearchParams(previous);
        if (value.trim()) next.set('search', value.trim());
        else next.delete('search');
        next.delete('page');
        return next;
      }, { replace: true });
    }, 400);
  };

  // DESAFÍO 2: filtro y página sincronizados con la URL.
  const handleCategory = (value: string) => {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      if (value === 'all') next.delete('category');
      else next.set('category', value);
      next.delete('page');
      return next;
    });
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map(product => product.category))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const search = searchFromUrl.trim().toLocaleLowerCase();
    return products.filter(product =>
      (category === 'all' || product.category === category) &&
      (product.title.toLocaleLowerCase().includes(search) ||
       product.description.toLocaleLowerCase().includes(search))
    );
  }, [products, category, searchFromUrl]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (nextPage: number) => {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      if (nextPage === 1) next.delete('page');
      else next.set('page', String(nextPage));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero">
        <p className="eyebrow">EXPLORA · ENCUENTRA · DESCUBRE</p>
        <h1>Encuentra tu próximo favorito.</h1>
        <p>Productos actualizados desde una API REST pública, sin datos escritos manualmente.</p>
      </section>

      <section className="toolbar" aria-label="Filtros del catálogo">
        <label className="field">
          <span>Buscar producto</span>
          <input
            type="search"
            placeholder="Ej. shirt, jacket, ring..."
            value={searchText}
            onChange={event => handleSearch(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Categoría</span>
          <select value={category} onChange={event => handleCategory(event.target.value)}>
            <option value="all">Todas las categorías</option>
            {categories.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </section>

      {isPending ? (
        <div className="state" role="status">Cargando productos...</div>
      ) : isError ? (
        <div className="state" role="alert">
          <h2>No se pudo cargar el catálogo</h2>
          <p>Comprueba tu conexión o intenta nuevamente.</p>
          <button onClick={() => void refetch()}>Reintentar</button>
        </div>
      ) : (
        <>
          <div className="results-header">
            <h2>Todos los productos</h2>
            <span>{filtered.length} resultado(s)</span>
          </div>
          {visible.length === 0 ? (
            <div className="state">No encontramos productos con esos filtros.</div>
          ) : (
            <div className="product-grid">
              {visible.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Paginación del catálogo">
              <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>← Anterior</button>
              <span>Página {currentPage} de {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Siguiente →</button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
