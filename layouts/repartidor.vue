<template>
    <div>
      <header class="bg-green-600 text-white py-4 w-full">
        <div class="flex justify-between items-center px-4">
          <h1 class="text-2xl font-bold">Repartidor - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-repartidor" class="hover:underline">Inicio</a></li>
            <li><a href="/assign-orders" class="hover:underline">Órdenes Asignadas</a></li>
            <li><a href="/logout" class="hover:underline">Cerrar Sesión</a></li>
          </ul>
        </div>
      </header>
      <main class="container mx-auto py-8">
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
  header {
    width: 100%;
  }
  </style>