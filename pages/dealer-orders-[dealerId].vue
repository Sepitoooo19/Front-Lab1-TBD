<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOrdersByDealerId } from '~/services/ordersService';
import type { Order } from '~/types/types';

// Obtener el dealerId de la URL
const route = useRoute();
const dealerId = Number(route.params.dealerId);

const orders = ref<Order[]>([]);

onMounted(async () => {
  try {
    // Llamada al servicio para obtener las órdenes del dealer actual
    orders.value = await getOrdersByDealerId(dealerId);
  } catch (error) {
    alert('Error al cargar el historial de órdenes');
  }
});

definePageMeta({
  layout: 'dealer', // Usa el layout para dealers
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Historial de Órdenes</h1>

    <!-- Tabla de órdenes -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Fecha de Pedido</th>
          <th class="px-4 py-2 text-left">Fecha de Entrega</th>
          <th class="px-4 py-2 text-left">Productos</th>
          <th class="px-4 py-2 text-left">Total</th>
          <th class="px-4 py-2 text-left">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.orderDate }}</td>
          <td class="px-4 py-2">{{ order.deliveryDate }}</td>
          <td class="px-4 py-2">{{ order.products }}</td>
          <td class="px-4 py-2">{{ order.totalPrice }}</td>
          <td class="px-4 py-2">{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>