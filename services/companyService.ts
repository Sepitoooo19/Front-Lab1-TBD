const config = useRuntimeConfig();
 
import type { Company } from '~/types/types';

export const getAllCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${useRuntimeConfig().public.apiBase}/companies`);
  if (!response.ok) {
    throw new Error('Error al obtener las compañías');
  }
  return await response.json();
};