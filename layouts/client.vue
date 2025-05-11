<template>
    <div class="flex flex-col min-h-screen">
      <header class="bg-blue-600 text-white py-4 w-full">
        <div class="flex justify-between items-center px-4">
          <h1 class="text-2xl font-bold">Cliente - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-client" class="hover:underline">Inicio</a></li>
            <li><a href="/client-order" class="hover:underline">Realizar pedido</a></li>
            <li><a href="/client-orders" class="hover:underline">Mis Pedidos</a></li>
            <li><a href="/client-cart" class="hover:underline">Carrito</a></li>
            <li><a href="/login" class="hover:underline">Cerrar Sesión</a></li>
          </ul>
        </div>
      </header>
      <main class="flex-grow container mx-auto py-8">
        <NuxtPage />
      </main>
      <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto text-center">
          <p>© 2025 Sistema de Delivery</p>
        </div>
      </footer>
    </div>
    <div>
    <nav class="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <NuxtLink to="/home-client" class="mr-4">Inicio</NuxtLink>
        <NuxtLink to="/profile" class="mr-4">Perfil</NuxtLink>
      </div>
      <button @click="handleLogout" class="bg-red-500 px-4 py-2 rounded">
        Cerrar Sesión
      </button>
    </nav>
    <NuxtPage />
  </div>
  </template>
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Elimina el token
    router.push('/login'); // Redirige al login
  };
  </script>
  
  <style scoped>
  /* Asegurar diseño horizontal para el header */
  header ul {
    display: flex;
    gap: 1rem; /* Espaciado entre los botones */
  }
  </style>