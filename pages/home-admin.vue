<template>
    <div>
      <header class="bg-red-600 text-white p-4">
        <nav class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Administrador - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-admin" class="hover:underline">Inicio</a></li>
            <li><a href="/clients" class="hover:underline">Clientes</a></li>
            <li><a href="/products" class="hover:underline">Productos</a></li>
            <li><a href="/orders" class="hover:underline">Pedidos</a></li>
            <li><a href="/repartidores" class="hover:underline">Repartidores</a></li>
          </ul>
        </nav>
      </header>
      <main class="p-6">
        <h2 class="text-2xl font-bold mb-4">Gestión del Sistema</h2>
        <p>Desde aquí puedes administrar clientes, productos, pedidos y repartidores.</p>
        <!-- Contenido adicional para administración -->
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  header {
    background-color: #dc3545;
  }
  </style>