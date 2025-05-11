import type { CartItem, Order } from '~/types/types';

const config = useRuntimeConfig();

export const getCart = async (): Promise<CartItem[]> => {
  const response = await fetch(`${config.public.apiBase}/cart`);
  if (!response.ok) {
    throw new Error('Error al obtener el carrito');
  }
  return await response.json();
};

export const addToCart = async (productId: number, quantity: number = 1): Promise<void> => {
  const response = await fetch(`${config.public.apiBase}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error('Error al agregar el producto al carrito');
  }
};

export const removeFromCart = async (productId: number): Promise<void> => {
  const response = await fetch(`${config.public.apiBase}/cart/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el producto del carrito');
  }
};