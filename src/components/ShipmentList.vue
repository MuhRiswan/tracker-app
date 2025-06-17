<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">🚚 Shipment List</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="shipment in shipmentStore.shipments" :key="shipment.id" class="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between">
        <div class="mb-1">
          <div class="text-sm text-gray-500">ID: {{ shipment.id }}</div>
          <div class="text-lg font-semibold">{{ shipment.origin }} → {{ shipment.destination }}</div>
          <div class="text-sm text-gray-600 mt-1">Vehicle Type: {{ shipment.vehicle_type }}</div>
          <div class="mt-2 inline-block px-3 py-1 text-xs rounded-md" :class="shipment.status === 'Assigned' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
            {{ shipment.status }}
          </div>
          <div v-if="shipment.assigned_transporter" class="text-sm text-gray-600 mt-1">Transporter: {{ shipment.assigned_transporter }}</div>
        </div>
        <router-link :to="`/shipment/${shipment.id}`" class="mt-4 block text-center bg-blue-600 text-white rounded-md py-1.5 hover:bg-blue-700 transition-all"> View Details </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShipmentStore } from "@/store/shipmentStore";
import { onMounted, onUnmounted } from "vue";
const shipmentStore = useShipmentStore();

let intervalId: number | NodeJS.Timeout;

onMounted(() => {
  intervalId = setInterval(() => {
    shipmentStore.toggleRandomStatus();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
