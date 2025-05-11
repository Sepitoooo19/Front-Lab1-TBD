<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Carrito de Compras</h1>
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
        <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          @click="handleRemoveFromCart(item.product.id)"
        >
          Eliminar
        </button>
      </li>
    </ul>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
      @click="goToPay"
    >
      Pagar
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCart } from '~/services/cartService';
import { removeFromCart } from '~/services/cartService';
import type { CartItem } from '~/types/types'; // Importa el tipo CartItem

const cart = ref<CartItem[]>([]); // Define el tipo explícito de cart
const router = useRouter();

const loadCart = async () => {
  try {
    cart.value = await getCart();
  } catch (err) {
    console.error("Error al cargar carrito:", err);
  }
};

const handleRemoveFromCart = async (productId: number) => {
  try {
    await removeFromCart(productId);
    cart.value = cart.value.filter(item => item.product.id !== productId);
  } catch (err) {
    console.error("Error al eliminar producto del carrito:", err);
  }
};

const goToPay = () => {
  router.push('/pay-cart');
};

onMounted(() => {
  loadCart();
});

 definePageMeta({
    layout: 'client', // Usa el layout de cliente
  });
</script>

<style scoped>
/* Estilo adicional opcional */
</style>