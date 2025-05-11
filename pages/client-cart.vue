<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Carrito de Compras</h1>

    <table v-if="cartProducts.length > 0" class="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">Precio</th>
          <th class="px-4 py-2 text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartProducts" :key="product.id" class="border-t hover:bg-gray-50">
          <td class="px-4 py-2">{{ product.id }}</td>
          <td class="px-4 py-2">{{ product.name }}</td>
          <td class="px-4 py-2">${{ product.price }}</td>
          <td class="px-4 py-2">
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              @click="removeFromCart(product.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="mt-4 text-gray-500">
      No hay productos en el carrito.
    </div>

    <button
      v-if="cartProducts.length > 0"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
      @click="createOrder"
    >
      Confirmar Pedido
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { createOrder as createOrderService } from '~/services/ordersService';

const cartStore = useCartStore();
cartStore.loadFromLocalStorage();

const cartProducts = computed(() => cartStore.products);

const removeFromCart = (productId: number) => {
  cartStore.removeProduct(productId);
};

const createOrder = async () => {
  try {
    const productIds = cartStore.products.map((product) => product.id).join(',');
    const order = {
      orderDate: new Date().toISOString(),
      status: "PENDIENTE",
    };

    await createOrderService(order, productIds);
    alert('Pedido creado exitosamente.');
    cartStore.clearCart();
  } catch (error) {
    console.error('Error al crear la orden:', error);
    alert('Error al crear la orden: ');
  }
};
</script>