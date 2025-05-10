<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Empresas</h1>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow" v-if="!error">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">Tipo</th>
          <th class="px-4 py-2 text-left">Entregas</th>
          <th class="px-4 py-2 text-left">Entregas Fallidas</th>
          <th class="px-4 py-2 text-left">Ventas Totales</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ company.id }}</td>
          <td class="px-4 py-2">{{ company.name }}</td>
          <td class="px-4 py-2">{{ company.type }}</td>
          <td class="px-4 py-2">{{ company.deliveries }}</td>
          <td class="px-4 py-2">{{ company.failedDeliveries }}</td>
          <td class="px-4 py-2">{{ company.totalSales }}</td>
          <td class="px-4 py-2 space-x-2">
            <button @click="viewDeliveries(company.id)" class="bg-blue-500 text-white px-3 py-1 rounded">Entregas</button>
            <button @click="viewFailedDeliveries(company.id)" class="bg-red-500 text-white px-3 py-1 rounded">Fallidas</button>
            <button @click="viewCompletedDeliveries(company.id)" class="bg-blue-500 text-white px-3 py-1 rounded">Entregas</button>
            <button @click="viewFailedDeliveries(company.id)" class="bg-red-500 text-white px-3 py-1 rounded">
              Fallidas
            </button>
            <button @click="viewProducts(company.id)" class="bg-green-500 text-white px-3 py-1 rounded">Productos</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllCompanies } from '~/services/companyService'; // Importa la función del servicio
import { useRouter } from 'vue-router';

// Variable para almacenar la lista de empresas
const companies = ref([]);

// Obtiene las empresas al montar el componente
onMounted(async () => {
  try {
    companies.value = await getAllCompanies(); // Llama a la función para obtener las empresas
  } catch (error) {
    console.error('Error al obtener la lista de empresas:', error);
  }
});

// Funciones para manejar las acciones de los botones
/*
const viewDeliveries = (companyId) => {
  window.location.href = `/orders/company/${companyId}`; // Cambia la ruta según tu estructura
  window.location.href = `/company/${companyId}/completed-deliveries`; // Cambia la ruta según tu estructura
};
*/
const viewCompletedDeliveries = (companyId) => {
  window.location.href = `/company/${companyId}/completed-deliveries`; // Cambia la ruta según tu estructura
};

const viewFailedDeliveries = (companyId) => {
  window.location.href = `/company/${companyId}/failed-deliveries`; // Cambia la ruta para que coincida con la estructura dinámica
};

const viewProducts = (companyId) => {
  window.location.href = `/companies/${companyId}/products`;
};

 definePageMeta({
    layout: 'admin', // Usa el layout de administrador
  });
</script>