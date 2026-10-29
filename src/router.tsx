import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Catalog /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
