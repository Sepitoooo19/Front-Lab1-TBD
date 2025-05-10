<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllDealers, deleteDealerById } from '~/services/dealerService';
import type { Dealer } from '~/types/types';

const router = useRouter();
const dealers = ref<Dealer[]>([]);

onMounted(async () => {
  try {
    dealers.value = await getAllDealers();
  } catch (error) {
    alert('Error al cargar los dealers');
  }
});

const createDealer = () => {
  router.push('/dealers/create'); // Ruta para crear un dealer
};

const editDealer = (dealer: Dealer) => {
  router.push(`/dealers/${dealer.id}/edit`); // Ruta para editar dealer
};

const deleteDealer = async (dealerId: number) => {
  const confirmDelete = confirm('¿Estás seguro que deseas eliminar este dealer?');
  if (confirmDelete) {
    try {
      await deleteDealerById(dealerId);
      dealers.value = await getAllDealers(); // Refrescar lista
    } catch (error) {
      alert('Error al eliminar el dealer');
    }
  }
};

const viewOrders = (dealerId: number) => {
  router.push(`/dealers/${dealerId}/orders`); // Ruta para ver órdenes
};

definePageMeta({
    layout: 'dealer', // Usa el layout de repartidor
  });
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Dealers</h1>

    <!-- Botón para crear dealer -->
    <div class="flex justify-end mb-4">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        @click="createDealer"
      >
        Crear Dealer
      </button>
    </div>

    <!-- Tabla de dealers -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">RUT</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Teléfono</th>
          <th class="px-4 py-2 text-left">Vehículo</th>
          <th class="px-4 py-2 text-left">Placa</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dealer in dealers" :key="dealer.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ dealer.id }}</td>
          <td class="px-4 py-2">{{ dealer.name }}</td>
          <td class="px-4 py-2">{{ dealer.rut }}</td>
          <td class="px-4 py-2">{{ dealer.email }}</td>
          <td class="px-4 py-2">{{ dealer.phone }}</td>
          <td class="px-4 py-2">{{ dealer.vehicle }}</td>
          <td class="px-4 py-2">{{ dealer.plate }}</td>
          <td class="px-4 py-2 space-x-2">
            <button
              class="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-2 rounded"
              @click="editDealer(dealer)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
              @click="deleteDealer(dealer.id)"
            >
              Eliminar
            </button>
            <button
              @click="viewOrders(dealer.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Ver órdenes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>