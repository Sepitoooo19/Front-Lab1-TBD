
import type { Product, Order } from '~/types/types';



const config = useRuntimeConfig();

export const getAllOrders = async (): Promise<Order[]> => {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBase}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener las órdenes');
  }

  return await response.json();
};
export const getOrderById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/orders/${id}`);
  if (!response.ok) throw new Error("Error al obtener la orden");
  return await response.json();
};


export const updateOrder = async (id: number, order: any) => {
  const response = await fetch(`${config.public.apiBase}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Error al actualizar la orden");
  return await response.json();
};

export const updateOrderStatusByDealerId = async (orderId: number, dealerId: number, newStatus: string) => {
  const response = await fetch(`${config.public.apiBase}/orders/${orderId}/dealer/${dealerId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el estado de la orden");
  }

  return await response.json();
};

export const deleteClientById = async (id: number) => {
    const response = await fetch(`${config.public.apiBase}/clients/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el cliente");
    return true;
  };

export const getOrdersByClient = async (): Promise<Order[]> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await fetch(`${config.public.apiBase}/orders/client/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Envía el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener las órdenes del cliente');
  }

  return await response.json();
};

export const getOrdersByClientId = async (clientId: number) => {
  const response = await fetch(`${config.public.apiBase}/orders/client/${clientId}`);
  if (!response.ok) throw new Error("Error al obtener las órdenes del cliente");
  return await response.json();
};


export const getOrdersByDealerId = async (dealerId: number) => {
  const response = await fetch(`${config.public.apiBase}/orders/dealer/${dealerId}`);
  console.log("Petición a:", response.url);
  if (!response.ok) throw new Error("Error al obtener las órdenes del dealer");
  const data = await response.json();
  console.log("Órdenes recibidas:", data);
  return data;
};

export const getOrdersByCompanyId = async (companyId: number) => {
    const response = await fetch(`${config.public.apiBase}/orders/company/${companyId}`);
    if (!response.ok) throw new Error("Error al obtener las órdenes de la compañía");
    return await response.json();
  }

export const getDeliveredOrdersByCompanyId = async (companyId: number) => {
    const response = await fetch(`${config.public.apiBase}/orders/delivered/company/${companyId}`);
    if (!response.ok) throw new Error("Error al obtener las órdenes de la compañía");
    return await response.json();
  }



export const getFailedDeliveriesByCompanyId = async (companyId: number) => {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBase}/orders/failed/company/${companyId}`);
  if (!response.ok) {
    throw new Error('Error al obtener las entregas fallidas');
  }
  return await response.json();
};
  

export const getProductsByOrderId = async (orderId: number): Promise<Product[]> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('authToken'); // Obtén el token de localStorage

  const response = await fetch(`${config.public.apiBase}/orders/${orderId}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los productos del pedido');
  }

  return await response.json();
};

export const createOrder = async (order: { orderDate: string; status: string }, productIds: string): Promise<void> => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await fetch(`http://localhost:8090/orders/create?productIds=${productIds}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    },
    body: JSON.stringify(order), // Enviar el cuerpo de la orden
  });

  if (!response.ok) {
    throw new Error('Error al crear el pedido');
  }
};

export const getClientAddress = async (): Promise<string> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token'); // Cambia 'authToken' por 'token'

  if (!token) {
    console.error('No se encontró el token de autenticación');
    throw new Error('No se encontró el token de autenticación');
  }

  const url = `${config.public.apiBase}/orders/address`;
  console.log('URL del endpoint:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error en la respuesta:', errorText);
    throw new Error('Error al obtener la dirección del cliente');
  }

  return await response.text(); // La dirección se devuelve como texto
};