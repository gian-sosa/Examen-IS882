import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const parsedId = Number(id);
  const validId = Number.isInteger(parsedId) && parsedId > 0;
  const { data: product, isPending, isError, error, refetch } = useProduct(parsedId);
  const back = `/${location.search}`;

  if (!validId) {
    return <div className="state"><h1>ID no válido</h1><Link to={back}>Volver al catálogo</Link></div>;
  }
  if (isPending) {
    return <div className="state" role="status">Cargando detalles...</div>;
  }
  if (isError) {
    const notFound = (axios.isAxiosError(error) && error.response?.status === 404) ||
      error.message === 'Producto no encontrado';
    return (
      <div className="state" role="alert">
        <h1>{notFound ? 'Producto no encontrado' : 'Error al consultar el producto'}</h1>
        <p>{notFound ? 'El producto solicitado no existe.' : 'Verifica la conexión y vuelve a intentarlo.'}</p>
        {!notFound && <button onClick={() => void refetch()}>Reintentar</button>}
        <p><Link to={back}>← Volver al catálogo</Link></p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="detail-page">
      <Link className="back-link" to={back}>← Volver al catálogo</Link>
      <div className="detail-grid">
        <div className="detail-image"><img src={product.image} alt={product.title} /></div>
        <div className="detail-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">US$ {product.price.toFixed(2)}</p>
          {product.rating && <p className="rating">★ {product.rating.rate} / 5 · {product.rating.count} reseñas</p>}
          <h2>Descripción</h2>
          <p>{product.description}</p>
          <Link className="primary-link" to={back}>Seguir explorando</Link>
        </div>
      </div>
    </section>
  );
}
