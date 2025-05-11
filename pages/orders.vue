<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Todas las Órdenes</h1>

    <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Cliente</th>
          <th class="px-4 py-2 text-left">Fecha de Orden</th>
          <th class="px-4 py-2 text-left">Fecha de Entrega</th>
          <th class="px-4 py-2 text-left">Estado</th>
          <th class="px-4 py-2 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-t hover:bg-gray-50">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.clientId.name }}</td>
          <td class="px-4 py-2">{{ formatDate(order.orderDate) }}</td>
          <td class="px-4 py-2">{{ formatDate(order.deliveryDate) }}</td>
          <td class="px-4 py-2">{{ order.status }}</td>
          <td class="px-4 py-2">${{ order.totalPrice.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="orders.length === 0" class="mt-4 text-gray-500">
      No hay órdenes registradas.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllOrders } from '~/services/ordersService'; // Importa el servicio para obtener las órdenes
import type { Order } from '~/types/types'; // Importa la interfaz Order

const orders = ref<Order[]>([]); // Lista de órdenes

// Función para formatear fechas
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};

// Carga las órdenes al montar el componente
onMounted(async () => {
  try {
    orders.value = await getAllOrders();
  } catch (err) {
    console.error('Error al cargar las órdenes:', err);
  }
});

definePageMeta({
    layout: 'admin',
    middleware: 'auth-role'
});
</script>