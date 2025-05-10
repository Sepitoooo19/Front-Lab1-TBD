


const config = useRuntimeConfig();

export const getAllOrders = async () => {
  const response = await fetch(`${config.public.apiBase}/orders`);
  if (!response.ok) throw new Error("Error al obtener las órdenes");
  return await response.json();
};

export const getOrderById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/orders/${id}`);
  if (!response.ok) throw new Error("Error al obtener la orden");
  return await response.json();
};

export const createOrder = async (order: any) => {
  const response = await fetch(`${config.public.apiBase}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Error al crear la orden");
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

export const getOrdersByClientId = async (clientId: number) => {
    const response = await fetch(`${config.public.apiBase}/orders/client/${clientId}`);
    console.log("Petición a:", response.url)
    if (!response.ok) throw new Error("Error al obtener las órdenes del cliente");
    const data = await response.json();
    console.log("Órdenes recibidas:", data);
    return data;
  };

export const getOrdersByDealerId = async (dealerId: number) => {
  const response = await fetch(`${config.public.apiBase}/orders/dealer/${dealerId}`);
  console.log("Petición a:", response.url);
  if (!response.ok) throw new Error("Error al obtener las órdenes del dealer");
  const data = await response.json();
  console.log("Órdenes recibidas:", data);
  return data;
};

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
  