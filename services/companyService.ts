const config = useRuntimeConfig();
 
import type { Company } from '~/types/types';

export const getAllCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${config.public.apiBase}/companies`);
  if (!response.ok) {
    throw new Error('Error al obtener las empresas');
  }
  return await response.json();
};

export const getCompanyById = async (companyId: string) => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token'); // Obtén el token de localStorage

  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await fetch(`${config.public.apiBase}/companies/${companyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener la compañía');
  }

  return await response.json();
};

export const updateCompanyMetrics = async (): Promise<void> => {
  const response = await fetch(`${config.public.apiBase}/companies/update-metrics`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error al actualizar las métricas de las empresas');
  }
};

export const getCompaniesWithMostFailedDeliveries = async (): Promise<any[]> => {
  const response = await fetch(`${config.public.apiBase}/companies/failed-deliveries`);
  if (!response.ok) {
    throw new Error('Error al obtener las empresas con más entregas fallidas');
  }
  return await response.json();
};