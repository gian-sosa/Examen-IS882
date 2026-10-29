import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types/product';
import { getProductById } from '../api/products';
import { productKeys } from '../hooks/useProducts';

type Props = { product: Product };

function ProductCardComponent({ product }: Props) {
  const location = useLocation();
  const queryClient = useQueryClient();

  const prefetch = () => {
    void queryClient.prefetchQuery({
      queryKey: productKeys.detail(product.id),
      queryFn: () => getProductById(product.id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <article className="product-card">
      <Link
        to={`/producto/${product.id}${location.search}`}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        className="product-link"
      >
        <div className="product-image-wrap">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h2>{product.title}</h2>
          <div className="product-footer">
            <strong>US$ {product.price.toFixed(2)}</strong>
            <span>Ver detalle →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
