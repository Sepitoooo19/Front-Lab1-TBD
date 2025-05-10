<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Pedidos Fallidos - Empresa {{ company.name }}</h1>
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Productos</th>
          <th class="px-4 py-2 text-left">Fecha Pedido</th>
          <th class="px-4 py-2 text-left">Fecha Fallo</th>
          <th class="px-4 py-2 text-left">Estado</th>
          <th class="px-4 py-2 text-left">Descripción Fallo</th>
          <th class="px-4 py-2 text-left">Repartidor</th>
          <th class="px-4 py-2 text-left">RUT Repartidor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="failure in failedDeliveries" :key="failure.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ failure.id }}</td>
          <td class="px-4 py-2">{{ failure.products }}</td>
          <td class="px-4 py-2">{{ failure.orderDate }}</td>
          <td class="px-4 py-2">{{ failure.failureDate }}</td>
          <td class="px-4 py-2">{{ failure.status }}</td>
          <td class="px-4 py-2">{{ failure.failureDescription }}</td>
          <td class="px-4 py-2">{{ failure.dealerName }}</td>
          <td class="px-4 py-2">{{ failure.dealerRUT }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFailedDeliveriesByCompanyId } from '~/services/companyService';

const route = useRoute();
const companyId = route.params.id;
const failedDeliveries = ref([]);

onMounted(async () => {
  failedDeliveries.value = await getFailedDeliveriesByCompanyId(companyId);
});
</script>