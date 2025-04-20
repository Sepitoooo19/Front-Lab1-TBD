<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllClients, deleteClientById, } from '~/services/clientService'
import { getOrdersByClientId } from '~/services/ordersService'
import type { Client } from '~/types/types'

const router = useRouter()
const clients = ref<Client[]>([])

onMounted(async () => {
  clients.value = await getAllClients()
})

const createClient = () => {
  router.push('/clients') // Ruta para crear un cliente
}

const editClient = (client: Client) => {
  router.push(`/clients/${client.id}`) // Ruta para editar cliente
}

const deleteClient = async (clientId: number) => {
  const confirmDelete = confirm('¿Estás seguro que deseas eliminar este cliente?')
  if (confirmDelete) {
    await deleteClientById(clientId)
    clients.value = await getAllClients() // Refrescar lista
  }
}


const viewOrders = (clientId: number) => {
  router.push(`/clientOrdersView/${clientId}`)
}

// Ver pedidos de un cliente
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Clientes</h1>

    <!-- Botón para crear cliente -->
    <div class="flex justify-end mb-4">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        @click="createClient"
      >
        Crear Cliente
      </button>
    </div>

    <!-- Tabla de clientes -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">RUT</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Teléfono</th>
          <th class="px-4 py-2 text-left">Dirección</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
          <td class="px-4 py-2">{{ client.id }}</td>
          <td class="px-4 py-2">{{ client.name }}</td>
          <td class="px-4 py-2">{{ client.rut }}</td>
          <td class="px-4 py-2">{{ client.email }}</td>
          <td class="px-4 py-2">{{ client.phone }}</td>
          <td class="px-4 py-2">{{ client.address }}</td>
          <td class="px-4 py-2 space-x-2">
            <button
              class="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-2 rounded"
              @click="router.push(`/edit-clients-${client.id}`)"
            >
              Editar
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
              @click="deleteClient(client.id)"
            >
              Eliminar
            </button>
            <button
              @click="router.push(`/client-orders-${client.id}`)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Ver órdenes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
