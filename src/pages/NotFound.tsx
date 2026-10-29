import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="state">
      <h1>404 · Página no encontrada</h1>
      <p>La dirección solicitada no existe.</p>
      <Link to="/">Volver al catálogo</Link>
    </div>
  );
}
