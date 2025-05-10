

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