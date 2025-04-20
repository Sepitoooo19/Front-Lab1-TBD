

const config = useRuntimeConfig();

export const getAllClients = async () => {
  const response = await fetch(`${config.public.apiBase}/clients`);
  if (!response.ok) throw new Error("Error al obtener los clientes");
  return await response.json();
};

export const getClientById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/clients/${id}`);
  if (!response.ok) throw new Error("Error al obtener el cliente");
  return await response.json();
};

export const createClient = async (client: any) => {
  const response = await fetch(`${config.public.apiBase}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) throw new Error("Error al crear el cliente");
  return await response.json();
};

export const updateClient = async (id: number, client: any) => {
  const response = await fetch(`${config.public.apiBase}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) throw new Error("Error al actualizar el cliente");
  return await response.json();
};

export const deleteClientById = async (id: number) => {
  const response = await fetch(`${config.public.apiBase}/clients/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el cliente");
  return await response.json();
};


