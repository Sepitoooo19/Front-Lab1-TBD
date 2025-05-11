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
import { createOrderDetailsForLastOrder } from '~/services/orderDetailsService';

const cartStore = useCartStore();
cartStore.loadFromLocalStorage();

const cartProducts = computed(() => cartStore.products);

const removeFromCart = (productId: number) => {
  cartStore.removeProduct(productId);
};

const createOrder = async () => {
  try {
    // Crear la orden
    const productIds = cartStore.products.map((product) => product.id).join(',');
    const order = {
      orderDate: new Date().toISOString(),
      status: "PENDIENTE",
    };

    await createOrderService(order, productIds);

    // Crear el detalle de la orden
    const totalProducts = cartProducts.value.length;
    const price = cartProducts.value.reduce((sum, product) => sum + product.price, 0);
    const paymentMethod = "Tarjeta de Crédito"; // Puedes cambiar esto según el método de pago seleccionado

    await createOrderDetailsForLastOrder(paymentMethod, totalProducts, price);

    alert('Pedido y detalles creados exitosamente.');
    cartStore.clearCart();
  } catch (error) {
    console.error('Error al crear la orden o los detalles:', error);
    alert('Hubo un error al confirmar el pedido.');
  }
};

definePageMeta({
  layout: 'client', // Usa el layout de cliente
});
</script>