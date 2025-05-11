
const config = useRuntimeConfig();

export const getAllPaymentMethods = async () => {
  const response = await fetch(`${config.public.apiBase}/paymentmethod`);
  if (!response.ok) throw new Error("Error al obtener los métodos de pago");
  return await response.json();
};

export const getPaymentMethodByCompanyId = async (companyId: number) => {
  const response = await fetch(`${config.public.apiBase}/paymentmethod/company/${companyId}`);
  if (!response.ok) throw new Error("Error al obtener los métodos de pago por empresa");
  return await response.json();
}