<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-green-600 text-white py-4 w-full">
      <div class="flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Repartidor - Sistema de Delivery</h1>
        <ul class="flex space-x-4">
          <li><a href="/home-dealer" class="hover:underline">Inicio</a></li>
          <li><a href="/profile-dealer" class="hover:underline">Perfil</a></li>
          <li><a href="/unassigned-orders-dealer" class="hover:underline">Órdenes sin asignar</a></li>
          <li>
            <!-- Enlace dinámico con dealerId -->
            <a :href="`/dealer-orders-${dealerId}`" class="hover:underline">Órdenes completadas</a>
          </li>
          <li><a href="/emergencies-dealer" class="hover:underline">Emergencias</a></li>
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

<script setup lang="ts">
// Obtener el dealerId desde localStorage
const dealerId = localStorage.getItem('dealerId');
</script>

<style scoped>
/* Asegurar diseño horizontal para el header */
header ul {
  display: flex;
  gap: 1rem; /* Espaciado entre los botones */
}
</style>