
import type { Product } from '~/types/types';

const config = useRuntimeConfig();

export const getAllProducts = async () => {
  const response = await fetch(`${config.public.apiBase}/products`);
  if (!response.ok) throw new Error("Error al obtener los productos");
  return await response.json();
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/products/${id}`);
  if (!response.ok) throw new Error("Error al obtener el producto");
  return await response.json();
};

export const createProduct = async (product: any) => {
  const response = await fetch(`${config.public.apiBase}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al crear el producto");
  return await response.json();
};

export const updateProduct = async (id: number, product: any) => {
  const response = await fetch(`${config.public.apiBase}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al actualizar el producto");
  return await response.json();
};

export const deleteProductById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el producto");
  return await response.json();
};

export const getProductsByCompanyId = async (companyId: number) => {
  const response = await fetch(`${config.public.apiBase}/products/company/${companyId}`);
  if (!response.ok) throw new Error("Error al obtener los productos por empresa");
  return await response.json();
};

export const getProductsByIds = async (ids: number[]): Promise<Product[]> => {
  const response = await fetch(`http://localhost:8090/products?ids=${ids.join(',')}`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return await response.json();
};

export const getCompanyIdByProductId = async (productId: number): Promise<number> => {
  const response = await fetch(`${config.public.apiBase}/products/companyid/${productId}`);
  console.log('Respuesta del backend:', response);

  if (!response.ok) {
    throw new Error('Error al obtener el ID de la empresa por producto');
  }

  // Procesa la respuesta como un número directamente
  const companyId = await response.json();
  console.log('Company ID obtenido del backend:', companyId);

  // Verifica que la respuesta sea un número válido
  if (typeof companyId !== 'number') {
    throw new Error('El backend devolvió un valor no válido para el ID de la empresa');
  }

  return companyId;
};