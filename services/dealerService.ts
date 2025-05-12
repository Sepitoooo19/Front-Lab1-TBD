const config = useRuntimeConfig();

export const getAllDealers = async () => {
  const response = await fetch(`${config.public.apiBase}/dealers`);
  if (!response.ok) throw new Error("Error al obtener los dealers");
  return await response.json();
};

export const getDealerById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/dealers/${id}`);
  if (!response.ok) throw new Error("Error al obtener el dealer");
  return await response.json();
};

export const createDealer = async (dealer: any) => {
  const response = await fetch(`${config.public.apiBase}/dealers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dealer),
  });
  if (!response.ok) throw new Error("Error al crear el dealer");
  return await response.json();
};

export const updateDealer = async (id: number, dealer: any) => {
  const response = await fetch(`${config.public.apiBase}/dealers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dealer),
  });
  if (!response.ok) throw new Error("Error al actualizar el dealer");
  return await response.json();
};

export const deleteDealerById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/dealers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el dealer");
  return true;
};

export const getDealerNameById = async (dealerId: number | null): Promise<string> => {
  if (dealerId === null) {
    return 'Sin asignar'; // Si el dealerId es null, devuelve "Sin asignar"
  }

  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBase}/dealers/${dealerId}/name`);

  if (!response.ok) {
    throw new Error('Error al obtener el nombre del repartidor');
  }

  return await response.text();
};

export const getAverageDeliveryTimeByDealer = async (): Promise<any[]> => {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBase}/dealers/average-delivery-time`);

  if (!response.ok) {
    throw new Error('Error al obtener el tiempo promedio de entrega por repartidor');
  }

  return await response.json();
};

export const getTopPerformingDealers = async (): Promise<any[]> => {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.apiBase}/dealers/top-performers`);

  if (!response.ok) {
    throw new Error('Error al obtener los repartidores con mejor rendimiento');
  }

  return await response.json();
};

export const getAuthenticatedDealerAverageDeliveryTime = async (): Promise<number> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token'); // Obtén el token JWT del almacenamiento local

  const response = await fetch(`${config.public.apiBase}/dealers/average-delivery-time-authenticated`, {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el tiempo promedio de espera del repartidor autenticado');
  }

  const data = await response.json();
  return typeof data === 'number' ? data : parseFloat(data);
};

export const getAuthenticatedDealerDeliveryCount = async (): Promise<number> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token'); // Obtén el token JWT del almacenamiento local

  const response = await fetch(`${config.public.apiBase}/dealers/delivery-count`, {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el número de entregas del repartidor autenticado');
  }

  const data = await response.json();
  return typeof data === 'number' ? data : parseInt(data, 10);
};