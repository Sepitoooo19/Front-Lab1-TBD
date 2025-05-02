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
