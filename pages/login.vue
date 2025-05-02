<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const username = ref("");
const password = ref("");
const role = ref("cliente"); // Rol por defecto
const loginError = ref("");

const handleLogin = async () => {
  loginError.value = ""; // Limpiar errores previos

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        role: role.value, // Enviar el rol seleccionado
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas o rol no autorizado");
    }

    const data = await response.json();
    const token = data.token;

    // Almacenar el token en localStorage
    localStorage.setItem("jwt", token);

    // Redirigir según el rol seleccionado
    if (role.value === "cliente") {
      router.push("/home-client");
    } else if (role.value === "repartidor") {
      router.push("/home-repartidor");
    } else if (role.value === "administrador") {
      router.push("/home-admin");
    } else {
      throw new Error("Rol desconocido");
    }
  } catch (error) {
    loginError.value = error.message || "Error al iniciar sesión";
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
        <select
          id="role"
          v-model="role"
          class="w-full border px-3 py-2 rounded"
        >
          <option value="cliente">Cliente</option>
          <option value="repartidor">Repartidor</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
        Iniciar Sesión
      </button>
    </form>
    <p v-if="loginError" class="text-red-500 mt-4 text-center">{{ loginError }}</p>
  </div>
</template>

<style scoped>
.login {
  margin-top: 2rem;
}
</style>