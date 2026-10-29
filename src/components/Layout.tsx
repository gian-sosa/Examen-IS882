import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">Nova<span>Store</span></Link>
          <span className="header-caption">Catálogo web dinámico · IS-882</span>
        </div>
      </header>
      <main className="container"><Outlet /></main>
      <footer className="site-footer">Laboratorio 07 · React + TypeScript + TanStack Query</footer>
    </div>
  );
}
