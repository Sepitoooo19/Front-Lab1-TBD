<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app'; // Importa useRuntimeConfig

const router = useRouter();
const username = ref('');
const password = ref('');
const loginError = ref('');

const handleLogin = async () => {
  loginError.value = '';
  try {
    const config = useRuntimeConfig();
    console.log('Datos enviados al backend para login:', { username: username.value, password: password.value });

    const response = await $fetch('/auth/login', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: username.value,
        password: password.value,
      },
    });

    console.log('Respuesta del backend:', response);

    // Verifica si el token está presente en la respuesta
    if (response && response.token) {
      // Guarda el token en localStorage
      localStorage.setItem('authToken', response.token);

      // Redirige según el rol del usuario
      switch (response.role) {
        case 'CLIENT':
          router.push('/home-client');
          break;
        case 'DEALER':
          router.push('/home-dealer');
          break;
        case 'ADMIN':
          router.push('/home-admin');
          break;
        default:
          throw new Error('Rol desconocido, por favor asignar un rol correcto');
      }
    } else {
      throw new Error(response?.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    loginError.value = error.message || 'Error desconocido al iniciar sesión';
  }
};
</script>

<template>
  <div class="login max-w-md mx-auto bg-white p-8 shadow-md rounded">
    <h1 class="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium">Usuario</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
        Iniciar Sesión
      </button>
    </form>
    <p v-if="loginError" class="text-red-500 mt-4 text-center">{{ loginError }}</p>
  </div>
</template>