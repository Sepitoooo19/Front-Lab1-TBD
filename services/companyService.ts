const config = useRuntimeConfig();
 
export const getAllCompanies = async () => {
  const response = await fetch('/companies');
  if (!response.ok) {
    throw new Error('Error al obtener las empresas');
  }
  return await response.json();
};