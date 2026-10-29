import { api } from './client';
import type { Product } from '../types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product | null>(`/products/${id}`);
  if (!response.data || typeof response.data.id !== 'number') {
    throw new Error('Producto no encontrado');
  }
  return response.data;
};
