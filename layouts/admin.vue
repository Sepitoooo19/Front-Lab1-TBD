<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-red-600 text-white py-4 w-full">
      <div class="flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Administrador - Sistema de Delivery</h1>
        <ul class="flex space-x-4">
          <li><a href="/home-admin" class="hover:underline">Inicio</a></li>
          <li><a href="/clients" class="hover:underline">Clientes</a></li>
          <li><a href="/orders" class="hover:underline">Todas las órdenes</a></li>
          <li><a href="/dealers" class="hover:underline">Repartidores</a></li>
          <li><a href="/unassigned-orders" class="hover:underline">Órdenes no asignadas</a></li>
          <li><a href="/companies-admin" class="hover:underline">Empresas</a></li>
          <!-- Botón de logout -->
          <li>
            <button @click="handleLogout" class="hover:underline">Cerrar Sesión</button>
          </li>
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

<script setup>
import { logout } from '~/services/authService'; // Importa la función de logout
import { useRouter } from 'vue-router'; // Importa el router para redirigir

const router = useRouter();

const handleLogout = async () => {
  await logout(); // Llama a la función de logout
  router.push('/login'); // Redirige al usuario al login
};
</script>

<style scoped>
/* Asegurar diseño horizontal para el header */
header ul {
  display: flex;
  gap: 1rem; /* Espaciado entre los botones */
}
</style>