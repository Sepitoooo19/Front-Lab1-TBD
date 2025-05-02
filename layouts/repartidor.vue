<template>
    <div class="flex flex-col min-h-screen">
      <header class="bg-green-600 text-white py-4 w-full">
        <div class="flex justify-between items-center px-4">
          <h1 class="text-2xl font-bold">Repartidor - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-repartidor" class="hover:underline">Inicio</a></li>
            <li><a href="/assign-orders" class="hover:underline">Órdenes Asignadas</a></li>
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
  </template>
  
  <style scoped>
  /* Asegurar diseño horizontal para el header */
  header ul {
    display: flex;
    gap: 1rem; /* Espaciado entre los botones */
  }
  </style>