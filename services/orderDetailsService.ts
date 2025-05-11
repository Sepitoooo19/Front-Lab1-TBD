const config = useRuntimeConfig();
import type { OrderDetails } from "~/types/types";

export const createOrderDetailsForLastOrder = async (paymentMethod: string, totalProducts: number, price: number): Promise<void> => {
  const response = await fetch(`${config.public.apiBase}/order-details/create-for-last-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentMethod,
      totalProducts,
      price,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al crear los detalles de la orden");
  }

  // Solo intenta analizar JSON si hay un cuerpo en la respuesta
  if (response.headers.get("Content-Type")?.includes("application/json")) {
    return await response.json();
  }

  return; // Si no hay cuerpo, simplemente retorna
};

export const getOrderDetailsByOrderId = async (orderId: number): Promise<OrderDetails[]> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('authToken'); // Obtén el token del localStorage

  const response = await fetch(`${config.public.apiBase}/order-details/order/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los detalles del pedido');
  }

  return await response.json();
};