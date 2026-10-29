import { useQuery } from '@tanstack/react-query';
import { getProductById, getProducts } from '../api/products';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => ['products', id] as const,
};

export function useProducts() {
  return useQuery({ queryKey: productKeys.all, queryFn: getProducts });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
