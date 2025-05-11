<template>
  <div>
    <!-- Título dinámico basado en el nombre de la empresa -->
    <h1 v-if="company.name" class="text-2xl font-bold mb-4">
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
          <th class="px-4 py-2 text-left">Tipo</th>
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
          <td class="px-4 py-2">{{ product.type }}</td>
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

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProductsByCompanyId } from '~/services/productService'; // Servicio para obtener productos
import { getCompanyById } from '~/services/companyService'; // Servicio para obtener la empresa
import { addToCart } from '~/services/cartService'; // Servicio para agregar al carrito

const route = useRoute();
const companyId = route.params.id; // Obtén el ID de la empresa desde la URL
const products = ref([]); // Lista de productos
const company = ref({}); // Datos de la empresa

const handleAddToCart = async (product) => {
  try {
    await addToCart(product.id); // Agregar producto al carrito
    alert(`Producto "${product.name}" agregado al carrito.`);
  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
  }
};

onMounted(async () => {
  try {
    // Carga los productos de la empresa
    products.value = await getProductsByCompanyId(companyId);

    // Carga los datos de la empresa
    company.value = await getCompanyById(companyId);
    console.log('Datos de la empresa cargados:', company.value); // Verifica los datos en la consola
  } catch (err) {
    console.error('Error al cargar los datos:', err);
  }
});

definePageMeta({
  layout: 'client', // Usa el layout de cliente
});
</script>

<style scoped>
</style>