<template>
  <div>
    <h1>Órdenes sin Asignar</h1>
    <table>
      <tr>
        <th>N° Orden</th>
        <th>Orden</th>
        <th>Monto</th>
        <th>Medio de Pago</th>
        <th>Fecha Pedido</th>
        <th>Dirección</th>
        <th>Acción</th>
      </tr>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.description }}</td>
        <td>{{ order.amount }}</td>
        <td>{{ order.paymentMethod }}</td>
        <td>{{ order.orderDate }}</td>
        <td>{{ order.address }}</td>
        <td><button @click="assignOrder(order.id)">Tomar Orden</button></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
onMounted(async () => {
  const response = await axios.get('/api/orders/unassigned');
  orders.value = response.data;
});

const assignOrder = async (orderId) => {
  await axios.put(`/api/orders/${orderId}/assign`);
  alert('Orden asignada');
};

definePageMeta({
    layout: 'dealer', // Usa el layout de repartidor
  });
</script>