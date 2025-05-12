
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProductsByCompanyId } from '~/services/productService';
import { getCompanyById } from '~/services/companyService';
import { useCartStore } from '~/stores/cart';
import type { Product, Company } from '~/types/types'; // Importa el tipo Product

const route = useRoute();
const companyId = Number(route.params.id); // Convierte el ID de la empresa a un número
const products = ref<Product[]>([]); // Lista de productos
const company = ref<Company | null>(null); // Permite que inicialmente sea null
const cartStore = useCartStore();
cartStore.loadFromLocalStorage();

const handleAddToCart = (product: Product) => {
  cartStore.addProduct({
    id: product.id,
    name: product.name,
    price: product.price, // Asegúrate de que `product.price` tenga un valor válido
  });
  console.log('Producto agregado al carrito:', product);
};

onMounted(async () => {
  try {
    products.value = await getProductsByCompanyId(companyId);
    console.log('Productos cargados:', products.value);
  } catch (err) {
    console.error('Error al cargar los productos:', err);
  }
});

definePageMeta({
  layout: 'client', // Usa el layout de cliente
});
</script>

<template>
  <div>
    <!-- Título dinámico basado en el nombre de la empresa -->
    <h1 v-if="company" class="text-2xl font-bold mb-4">
      Productos - Empresa {{ company.name }}
    </h1>
    <h1 v-else class="text-2xl font-bold mb-4">
      Cargando datos de la empresa...
    </h1>

    <!-- Tabla de productos -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">Precio</th>
          <th class="px-4 py-2 text-left">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2">{{ product.name }}</td>
          <td class="px-4 py-2">${{ product.price }}</td>
          <td class="px-4 py-2">
            <button
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              @click="handleAddToCart(product)"
            >
              Agregar al Carrito
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>