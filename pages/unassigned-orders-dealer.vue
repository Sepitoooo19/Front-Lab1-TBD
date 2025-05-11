<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/orders/unassigned');
    orders.value = response.data;
  } catch (error) {
    console.error("Error al cargar órdenes sin asignar:", error);
  }
});

const assignOrder = async (orderId) => {
  try {
    await axios.put(`/api/orders/${orderId}/assign`);
    alert('Orden asignada');
    // Opcional: Remueve la orden asignada de la lista local
    orders.value = orders.value.filter(order => order.id !== orderId);
  } catch (error) {
    console.error("Error al asignar la orden:", error);
  }
};

definePageMeta({
  layout: 'dealer', // Usa el layout de repartidor
});
</script>

<style scoped>
/* Estilo adicional opcional */
</style>

<template>
  <div>
    <h1>Órdenes sin Asignar</h1>
    <table>
      <thead>
        <tr>
          <th>N° Orden</th>
          <th>Orden</th>
          <th>Monto</th>
          <th>Medio de Pago</th>
          <th>Fecha Pedido</th>
          <th>Dirección</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.description }}</td>
          <td>{{ order.amount }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.address }}</td>
          <td><button @click="assignOrder(order.id)">Tomar Orden</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>