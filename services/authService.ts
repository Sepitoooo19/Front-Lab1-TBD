
const config = useRuntimeConfig();

export const login = async (email: string, password: string) => {
  const response = await fetch(`${config.public.apiBase}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Error al iniciar sesión");
  return await response.json();
};


export const register = async (user: any) => {
  const response = await fetch(`${config.public.apiBase}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error al registrar el usuario");
  return await response.json();
};