export default {
    layout: 'repartidor'
}

<template>
    <div>
      <header class="bg-green-600 text-white p-4">
        <nav class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Repartidor - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-repartidor" class="hover:underline">Inicio</a></li>
            <li><a href="/assign-orders" class="hover:underline">Órdenes Asignadas</a></li>
          </ul>
        </nav>
      </header>
      <main class="p-6">
        <h2 class="text-2xl font-bold mb-4">Gestión de Pedidos</h2>
        <p>Aquí puedes gestionar y actualizar el estado de tus pedidos.</p>
        <!-- Contenido adicional para gestión de pedidos -->
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  header {
    background-color: #28a745;
  }
  </style>