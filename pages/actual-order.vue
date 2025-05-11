<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Orden Activa</h1>
    <div v-if="order" class="border border-gray-300 rounded-lg shadow-md p-6 bg-white">
      <h2 class="text-xl font-bold">N° Orden: {{ order.id }}</h2>
      <p><strong>Id Repartidor:</strong> {{ order.dealerId || 'N/A' }}</p>
      <p><strong>Nombre Repartidor:</strong> {{ order.dealerId.name || 'N/A' }}</p>
      <p><strong>Monto:</strong> ${{ order.totalPrice }}</p>
      <p><strong>Estado:</strong> {{ order.status }}</p>
      <p><strong>Fecha de Orden:</strong> {{ new Date(order.orderDate).toLocaleString() }}</p>
      <p><strong>Id Cliente:</strong> {{ order.clientId || 'N/A' }}</p>
      <p><strong>Nombre Cliente:</strong> {{ order.nameClient || 'N/A' }}</p>
      <p><strong>Dirección:</strong> {{ order.address || 'N/A' }}</p>
      <!-- <p><strong>Metodo de Pago:</strong> {{ order.paymentMethod || 'N/A' }}</p> -->

      
      <div class="mt-4 flex space-x-4">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          @click="deliverOrder"
        >
          Entregar
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          @click="failOrder"
        >
          Emergencia
        </button>
      </div>
    </div>
    <div v-else class="text-gray-500">
      No hay una orden asignada actualmente.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getActiveOrderByDealer, updateOrderStatus } from '~/services/ordersService';
import type { Order } from '~/types/types';

const order = ref<Order | null>(null);

const loadActiveOrder = async () => {
  try {
    const activeOrder = await getActiveOrderByDealer();
    order.value = activeOrder;
  } catch (err) {
    console.error('Error al cargar la orden activa:', err);
    order.value = null;
  }
};

const updateOrder = async (newStatus: string) => {
  if (!order.value) return;
  try {
    const body: any = { status: newStatus };
    
    // Si es un fallo, asignamos null a la fecha de entrega
    if (newStatus === 'FALLIDA') {
      body.deliveryDate = null;
    }
    
    await updateOrderStatus(order.value.id, body);
    const successMessage = newStatus === 'ENTREGADO' 
      ? 'Orden entregada exitosamente.' 
      : 'La orden fue marcada como fallida.';
    alert(successMessage);
    order.value = null;
  } catch (err) {
    console.error(`Error al actualizar el estado a ${newStatus}:`, err);
    alert(`Error: ${(err as Error).message}`);
  }
};

const deliverOrder = () => updateOrder('ENTREGADO');
const failOrder = () => updateOrder('FALLIDA');

onMounted(() => {
  loadActiveOrder();
});

definePageMeta({
  layout: 'dealer',
});
</script>

<style scoped> 
</style>