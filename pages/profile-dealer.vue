<script setup>
import { ref, onMounted } from 'vue';
import { getDealerNameById } from '~/services/dealerService';
import { getAverageDeliveryTimeByDealer } from '~/services/dealerService';
import { getDealerRatings } from '~/services/ratingService';
import { getDealerDeliveryCount } from '~/services/dealerService';

const dealerId = 1; // Reemplaza con el ID dinámico del repartidor
const dealer = ref({
  name: '',
  avgWaitTime: null,
  rating: null,
  deliveryCount: null,
});
const errorMessage = ref(null);

onMounted(async () => {
  try {
    // Obtener el nombre del repartidor
    dealer.value.name = await getDealerNameById(dealerId);

    // Obtener el tiempo de espera promedio
    const avgWaitTimeData = await getAverageDeliveryTimeByDealer(dealerId);
    dealer.value.avgWaitTime = avgWaitTimeData.avg_delivery_time_hours;

    // Obtener la puntuación promedio
    const ratings = await getDealerRatings(dealerId);
    if (ratings.length > 0) {
      const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      dealer.value.rating = (totalRatings / ratings.length).toFixed(2);
    } else {
      dealer.value.rating = 'Sin calificaciones';
    }

    // Obtener el número de entregas
    dealer.value.deliveryCount = await getDealerDeliveryCount(dealerId);
  } catch (error) {
    console.error('Error al cargar los datos del repartidor:', error);
    errorMessage.value = 'Hubo un error al cargar los datos del repartidor.';
  }
});

definePageMeta({
  layout: 'dealer', // Usa el layout de repartidor
});
</script>

<template>
  <div>
    <h1>Perfil del Repartidor</h1>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <ul v-else>
      <li><strong>Nombre:</strong> {{ dealer.name }}</li>
      <li><strong>Puntuación Promedio:</strong> {{ dealer.rating }}</li>
      <li><strong>Tiempo de Espera Promedio:</strong> {{ dealer.avgWaitTime }} horas</li>
      <li><strong>Número de Entregas:</strong> {{ dealer.deliveryCount }}</li>
    </ul>
  </div>
</template>