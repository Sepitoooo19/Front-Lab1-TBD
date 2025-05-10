<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Órdenes no asignadas</h1>
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Productos</th>
          <th class="px-4 py-2 text-left">Fecha Pedido</th>
          <th class="px-4 py-2 text-left">Estado</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.products }}</td>
          <td class="px-4 py-2">{{ order.orderDate }}</td>
          <td class="px-4 py-2">
            <select v-model="order.status" @change="handleOrderStatusChange(order.id, order.status)">
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
              <option value="fallido">Fallido</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUnassignedOrders, updateOrderStatus as updateOrderStatusService } from '~/services/ordersService';

const orders = ref([]);
onMounted(async () => {
  orders.value = await getUnassignedOrders();
});

const handleOrderStatusChange = async (orderId, status) => {
  await updateOrderStatusService(orderId, status);
  alert('Estado actualizado');
};
</script>