export default {
    layout: 'client'
}

<template>
    <div>
      <header class="bg-blue-600 text-white p-4">
        <nav class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Cliente - Sistema de Delivery</h1>
          <ul class="flex space-x-4">
            <li><a href="/home-client" class="hover:underline">Inicio</a></li>
            <li><a href="/orders" class="hover:underline">Mis Pedidos</a></li>
          </ul>
        </nav>
      </header>
      <main class="p-6">
        <h2 class="text-2xl font-bold mb-4">Bienvenido al Sistema de Delivery</h2>
        <p>Aquí podrás explorar las comidas disponibles y realizar pedidos.</p>
        <!-- Contenido adicional para mostrar comidas -->
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  header {
    background-color: #007acc;
  }
  </style>