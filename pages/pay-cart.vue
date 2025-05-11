<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Pago del Carrito</h1>
    <div v-if="cart.length === 0" class="text-gray-500">
      Tu carrito está vacío.
    </div>
    <ul>
      <li
        v-for="item in cart"
        :key="item.product.id"
        class="border border-gray-300 p-4 mb-2 rounded"
      >
        <h2 class="font-semibold">{{ item.product.name }}</h2>
        <p>Precio: ${{ item.product.price }}</p>
        <p>Cantidad: {{ item.quantity }}</p>
      </li>
    </ul>
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
      @click="payCart"
    >
      Confirmar y Pagar
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCart } from '~/services/cartService';
import { createOrderWithProducts } from '~/services/ordersService';
import type { CartItem } from '~/types/types';

const cart = ref<CartItem[]>([]); 
const router = useRouter();

const loadCart = async () => {
  try {
    cart.value = await getCart();
  } catch (err) {
    console.error("Error al cargar carrito:", err);
  }
};

const payCart = async () => {
  try {
    await createOrderWithProducts(cart.value);
    alert("Pedido realizado con éxito.");
    router.push('/client-order');
  } catch (err) {
    console.error("Error al pagar carrito:", err);
  }
};

onMounted(() => {
  loadCart();
});
</script>

<style scoped>
/* Estilo adicional opcional */
</style>