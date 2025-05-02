<template>
    <div class="register max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h1 class="text-2xl font-bold mb-4 text-center">Registro</h1>
      <form @submit.prevent="handleRegister">
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium">Usuario</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
  
        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
  
        <!-- Role -->
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium">Rol</label>
          <select
            id="role"
            v-model="form.role"
            @change="updateFields"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="cliente">Cliente</option>
            <option value="repartidor">Repartidor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
  
        <!-- Dynamic Fields -->
        <template v-if="form.role === 'cliente'">
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              id="address"
              v-model="form.address"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </template>
  
        <template v-if="form.role === 'repartidor'">
          <div class="mb-4">
            <label for="vehicle" class="block text-sm font-medium">Vehículo</label>
            <input
              type="text"
              id="vehicle"
              v-model="form.vehicle"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="mb-4">
            <label for="plate" class="block text-sm font-medium">Placa</label>
            <input
              type="text"
              id="plate"
              v-model="form.plate"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </template>
  
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Registrar
        </button>
      </form>
      <p v-if="registerError" class="text-red-500 mt-4 text-center">{{ registerError }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const form = ref({
    username: "",
    password: "",
    role: "cliente",
    address: "",
    vehicle: "",
    plate: "",
  });
  
  const registerError = ref("");
  
  const handleRegister = async () => {
    registerError.value = "";
    try {
      const response = await $fetch("/auth/register", {
        method: "POST",
        body: form.value,
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }
  
      alert("Usuario registrado exitosamente");
    } catch (error) {
      registerError.value = error.message || "Error al registrar";
    }
  };
  
  const updateFields = () => {
    form.value.address = "";
    form.value.vehicle = "";
    form.value.plate = "";
  };
  </script>
  
  <style scoped>
  .register {
    margin-top: 2rem;
  }
  </style>