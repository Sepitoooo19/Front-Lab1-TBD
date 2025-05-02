export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem("jwt");
  
    if (!token) {
      return navigateTo("/login"); // Redirigir si no está autenticado
    }
  });