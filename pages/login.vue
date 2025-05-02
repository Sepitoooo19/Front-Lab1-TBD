<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref("");
const password = ref("");
const role = ref("cliente");

const handleLogin = () => {
  if (role.value === "cliente") {
    router.push("/home-client");
  } else if (role.value === "repartidor") {
    router.push("/home-repartidor");
  } else if (role.value === "administrador") {
    router.push("/home-admin");
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
          type="text"
          id="username"
          v-model="username"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="role" class="block text-sm font-medium">Rol</label>
        <select id="role" v-model="role" class="w-full border px-3 py-2 rounded">
          <option value="cliente">Cliente</option>
          <option value="repartidor">Repartidor</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
        Iniciar Sesión
      </button>
    </form>
  </div>
</template>

<style scoped>
.login {
  margin-top: 2rem;
}
</style>