


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