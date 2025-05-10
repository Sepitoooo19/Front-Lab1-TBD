<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Order, Product } from '~/types/types'
import { getOrdersByClient, getProductsByOrderId } from '~/services/ordersService'

const orders = ref<Order[]>([]) // Lista de órdenes del cliente
const products = ref<Product[]>([]);
const showModal = ref(false); // Controla la visibilidad del modal
const selectedOrderId = ref<number | null>(null); // ID del pedido seleccionado

// Carga las órdenes del cliente autenticado
const loadOrders = async () => {
  try {
    orders.value = await getOrdersByClient()
  } catch (err) {
    console.error("Error al cargar órdenes:", err)
  }
}

// Formatea las fechas para mostrarlas en la tabla
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}

// Carga las órdenes al montar el componente
onMounted(() => {
  loadOrders()
})

const viewProducts = async (orderId: number) => {
  try {
    selectedOrderId.value = orderId; // Guarda el ID del pedido seleccionado
    products.value = await getProductsByOrderId(orderId); // Carga los productos
    showModal.value = true; // Muestra el modal
  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
};

definePageMeta({
    layout: 'client', // Usa el layout de administrador
  });
</script>


<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Mis Órdenes</h1>

    <table class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Fecha de Orden</th>
          <th class="px-4 py-2 text-left">Fecha de Entrega</th>
          <th class="px-4 py-2 text-left">Estado</th>
          <th class="px-4 py-2 text-left">Productos</th>
          <th class="px-4 py-2 text-left">Precio Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-t">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ formatDate(order.orderDate) }}</td>
          <td class="px-4 py-2">{{ formatDate(order.deliveryDate) }}</td>
          <td class="px-4 py-2">{{ order.status }}</td>
          <td class="px-4 py-2">
            <button
              @click="viewProducts(order.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Ver Productos
            </button>
          </td>
          <td class="px-4 py-2">${{ order.totalPrice.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="orders.length === 0" class="mt-4 text-gray-500">
      No tienes órdenes registradas.
    </div>

    <!-- Modal para mostrar los productos -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md w-1/2">
        <h2 class="text-xl font-bold mb-4">
          Productos del Pedido #{{ selectedOrderId }}
        </h2>
        <ul>
          <li v-for="product in products" :key="product.id" class="mb-2">
            {{ product.name }} - ${{ product.price.toFixed(2) }}
          </li>
        </ul>
        <button
          @click="showModal = false"
          class="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
