<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Consultas</h1>

    <!-- Cuadro para el Cliente con Mayor Gasto -->
    <div
      class="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4"
      style="min-height: 150px;"
    >
      <h2 class="text-xl font-bold mb-2">Cliente con Mayor Gasto</h2>
      <div v-if="topSpender">
        <p><strong>Nombre:</strong> {{ topSpender.name }}</p>
        <p><strong>RUT:</strong> {{ topSpender.rut }}</p>
        <p><strong>Email:</strong> {{ topSpender.email }}</p>
        <p><strong>Teléfono:</strong> {{ topSpender.phone }}</p>
        <p><strong>Dirección:</strong> {{ topSpender.address }}</p>
        <p><strong>Total Gastado:</strong> ${{ topSpender.totalSpent }}</p>
      </div>
      <div v-else class="text-gray-500">
        Presiona el botón para obtener el cliente con mayor gasto.
      </div>
    </div>

    <!-- Botón para obtener el Cliente con Mayor Gasto -->
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      @click="fetchTopSpender"
    >
      Obtener Cliente con Mayor Gasto
    </button>

    <!-- Cuadro para los Productos Más Pedidos por Categoría -->
    <div
      class="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4"
      style="min-height: 150px;"
    >
      <h2 class="text-xl font-bold mb-2">Productos Más Pedidos por Categoría</h2>
      <div v-if="topProducts.length > 0">
        <ul>
          <li v-for="product in topProducts" :key="product.product_name">
            <strong>Categoría:</strong> {{ product.category }} - 
            <strong>Producto:</strong> {{ product.product_name }} - 
            <strong>Cantidad:</strong> {{ product.product_count }}
          </li>
        </ul>
      </div>
      <div v-else class="text-gray-500">
        Presiona el botón para obtener los productos más pedidos por categoría.
      </div>
    </div>

    <!-- Botón para obtener los Productos Más Pedidos por Categoría -->
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
      @click="fetchTopProducts"
    >
      Obtener Productos Más Pedidos
    </button>

    <!-- Cuadro para las Empresas con Más Entregas Fallidas -->
    <div
      class="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4"
      style="min-height: 150px;"
    >
      <h2 class="text-xl font-bold mb-2">Empresas con Más Entregas Fallidas</h2>
      <div v-if="companiesWithMostFailedDeliveries.length > 0">
        <ul>
          <li v-for="company in companiesWithMostFailedDeliveries" :key="company.id">
            <strong>Nombre:</strong> {{ company.name }} - 
            <strong>Entregas Fallidas:</strong> {{ company.failedDeliveries }}
          </li>
        </ul>
      </div>
      <div v-else class="text-gray-500">
        Presiona el botón para obtener las empresas con más entregas fallidas.
      </div>
    </div>

    <!-- Botón para obtener las Empresas con Más Entregas Fallidas -->
    <button
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      @click="fetchCompaniesWithMostFailedDeliveries"
    >
      Obtener Empresas con Más Entregas Fallidas
    </button>

    <!-- Cuadro para el Método de Pago Más Utilizado en Pedidos Urgentes -->
    <div
      class="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4"
      style="min-height: 150px;"
    >
      <h2 class="text-xl font-bold mb-2">Método de Pago Más Utilizado en Pedidos Urgentes</h2>
      <div v-if="mostUsedPaymentMethod">
        <p><strong>Método:</strong> {{ mostUsedPaymentMethod.method }}</p>
        <p><strong>Veces Usado:</strong> {{ mostUsedPaymentMethod.count }}</p>
      </div>
      <div v-else class="text-gray-500">
        Presiona el botón para obtener el método de pago más utilizado en pedidos urgentes.
      </div>
    </div>

    <!-- Botón para obtener el Método de Pago Más Utilizado -->
    <button
      class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      @click="fetchMostUsedPaymentMethod"
    >
      Obtener Método de Pago Más Utilizado
    </button>

    <!-- Mensaje de error -->
    <div v-if="errorMessage" class="text-red-500 mt-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getTopSpender } from '~/services/ordersService';
import { getTopProductsByCategoryForLastMonth } from '~/services/productService';
import { getCompaniesWithMostFailedDeliveries } from '~/services/companyService';
import { getMostUsedPaymentMethodForUrgentOrders } from '~/services/orderDetailsService'; // Importa el servicio para obtener el método de pago más utilizado
import type { TopSpender } from '~/types/types';

const topSpender = ref<TopSpender | null>(null);
const topProducts = ref<any[]>([]); // Lista de productos más pedidos
const companiesWithMostFailedDeliveries = ref<any[]>([]); // Lista de empresas con más entregas fallidas
const mostUsedPaymentMethod = ref<{ method: string; count: number } | null>(null); // Método de pago más utilizado
const errorMessage = ref<string | null>(null);

// Función para obtener el Cliente con Mayor Gasto
const fetchTopSpender = async () => {
  try {
    errorMessage.value = null;
    topSpender.value = await getTopSpender();
    console.log('Cliente con mayor gasto:', topSpender.value);
  } catch (error) {
    console.error('Error al obtener el cliente con mayor gasto:', error);
    errorMessage.value = 'Hubo un error al cargar el cliente con mayor gasto.';
  }
};

// Función para obtener los Productos Más Pedidos por Categoría
const fetchTopProducts = async () => {
  try {
    errorMessage.value = null;
    topProducts.value = await getTopProductsByCategoryForLastMonth();
    console.log('Productos más pedidos por categoría:', topProducts.value);
  } catch (error) {
    console.error('Error al obtener los productos más pedidos:', error);
    errorMessage.value = 'Hubo un error al cargar los productos más pedidos.';
  }
};

// Función para obtener las Empresas con Más Entregas Fallidas
const fetchCompaniesWithMostFailedDeliveries = async () => {
  try {
    errorMessage.value = null;
    companiesWithMostFailedDeliveries.value = await getCompaniesWithMostFailedDeliveries();
    console.log('Empresas con más entregas fallidas:', companiesWithMostFailedDeliveries.value);
  } catch (error) {
    console.error('Error al obtener las empresas con más entregas fallidas:', error);
    errorMessage.value = 'Hubo un error al cargar las empresas con más entregas fallidas.';
  }
};

// Función para obtener el Método de Pago Más Utilizado en Pedidos Urgentes
const fetchMostUsedPaymentMethod = async () => {
  try {
    errorMessage.value = null;
    mostUsedPaymentMethod.value = await getMostUsedPaymentMethodForUrgentOrders();
    console.log('Método de pago más utilizado en pedidos urgentes:', mostUsedPaymentMethod.value);
  } catch (error) {
    console.error('Error al obtener el método de pago más utilizado:', error);
    errorMessage.value = 'Hubo un error al cargar el método de pago más utilizado en pedidos urgentes.';
  }
};

definePageMeta({
  layout: 'admin',
  middleware: 'auth-role'
});
</script>

<style scoped>
/* Estilo opcional para los cuadros */
div {
  font-family: Arial, sans-serif;
}
</style>