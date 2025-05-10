<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Pedidos Fallidos - Empresa #{{ companyId }}</h1>
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Fecha Pedido</th>
          <th class="px-4 py-2 text-left">Fecha Fallo</th>
          <th class="px-4 py-2 text-left">Estado</th>
          <th class="px-4 py-2 text-left">Monto Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="failure in failedDeliveries" :key="failure.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ failure.id }}</td>
          <td class="px-4 py-2">{{ failure.orderDate }}</td>
          <td class="px-4 py-2">{{ failure.deliveryDate }}</td>
          <td class="px-4 py-2">{{ failure.status }}</td>
          <td class="px-4 py-2">{{ failure.totalPrice }}</td>
        </tr>
        <tr v-if="failedDeliveries.length === 0">
          <td colspan="5" class="px-4 py-2 text-center text-gray-500">No se encontraron pedidos fallidos para esta empresa.</td>
        </tr>
      </tbody>
    </table>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFailedDeliveriesByCompanyId } from '~/services/ordersService'; // Asegúrate de que el servicio esté correctamente importado

const route = useRoute();
const companyId = route.params.id; // Obtiene el parámetro de la ruta
const failedDeliveries = ref([]); // Lista de entregas fallidas
const error = ref(null); // Manejo de errores

// Obtén las entregas fallidas al montar el componente
onMounted(async () => {
  try {
    failedDeliveries.value = await getFailedDeliveriesByCompanyId(companyId);
  } catch (err) {
    console.error('Error al obtener las entregas fallidas:', err);
    error.value = 'No se pudieron cargar las entregas fallidas.';
  }
});
</script>