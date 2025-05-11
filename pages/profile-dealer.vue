
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dealer = ref({});
onMounted(async () => {
  const response = await axios.get('/api/dealers/1'); // Replace '1' with dealer ID
  dealer.value = response.data;
});

definePageMeta({
    layout: 'dealer', // Usa el layout de repartidor
  });
</script>

<template>
  <div>
    <h1>Perfil del Repartidor</h1>
    <ul>
      <li><strong>Nombre:</strong> {{ dealer.name }}</li>
      <li><strong>Puntuación:</strong> {{ dealer.rating }}</li>
      <li><strong>Tiempo de espera promedio:</strong> {{ dealer.avgWaitTime }}</li>
      <li><strong>Número de entregas:</strong> {{ dealer.deliveryCount }}</li>
    </ul>
  </div>
</template>
