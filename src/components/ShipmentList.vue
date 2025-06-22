<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Skeleton } from "@/components/ui/skeleton";
import { useShipment } from "@/composables/useShipment";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "vue-router";
import { Button } from "./ui/button";
import { toast } from "vue-sonner";

const router = useRouter();
const role = ref(localStorage.getItem("role"));
const { shipments, fetchShipments, toggleRandomStatus } = useShipment();
const isLoading = ref(true);
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPageOptions = [1, 5, 10, 50];
const itemsPerPage = ref(5);

const filteredShipments = computed(() => {
  const query = searchTerm.value.toLowerCase();
  return shipments.value.filter((s) => {
    return s.origin.toLowerCase().includes(query) || s.destination.toLowerCase().includes(query) || (s.assigned_transporter || "").toLowerCase().includes(query);
  });
});

const paginatedShipments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredShipments.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredShipments.value.length / itemsPerPage.value);
});

// Mereset halamannya ke page 1 ketika searchTerm berubah
watch(searchTerm, () => {
  currentPage.value = 1;
});

let intervalId: number | NodeJS.Timeout;

const handleLogout = () => {
  console.log("tes");
  localStorage.removeItem("role");
  router.push("/login");
  return toast.success("Logout successful.", { duration: 1500 });
};

onMounted(() => {
  fetchShipments();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);

  intervalId = setInterval(() => {
    toggleRandomStatus();
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="p-4">
    <div class="w-full flex justify-between">
      <h1 class="text-2xl font-bold mb-4">🚚 Shipment List - {{ role }}</h1>
      <Button @click="handleLogout" variant="destructive" class="cursor-pointer">Logout</Button>
    </div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <div class="relative items-center w-full max-w-md">
        <Input v-model="searchTerm" id="search" type="search" placeholder="Search by origin, destination, or transporter" class="py-0 pl-10 h-9" />
        <span class="absolute inset-y-0 flex items-center justify-center px-2 py-0 start-0">
          <Search class="h-4 text-muted-foreground" />
        </span>
      </div>

      <div class="w-full">
        <Select v-model="itemsPerPage">
          <SelectTrigger>
            <SelectValue :placeholder="`${itemsPerPage}`" />
          </SelectTrigger>
          <SelectContent class="max-w-14">
            <SelectItem class="w-fit" v-for="option in itemsPerPageOptions" :key="option" :value="option"> {{ option }} </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-if="isLoading">
        <div v-for="n in itemsPerPage" :key="n" class="bg-white rounded-2xl shadow-md p-4 animate-pulse space-y-3">
          <Skeleton class="h-4 w-1/3" />
          <Skeleton class="h-6 w-2/3" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-5 w-1/4 rounded-md" />
          <Skeleton class="h-4 w-2/3" />
          <Skeleton class="h-9 w-full rounded-md" />
        </div>
      </template>

      <template v-else>
        <div v-for="shipment in paginatedShipments" :key="shipment.id" class="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between">
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
      </template>
    </div>

    <div class="mt-6" v-if="totalPages > 1">
      <Pagination :total="filteredShipments.length" :items-per-page="itemsPerPage" :default-page="currentPage" @update:page="(p) => (currentPage = p)">
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious />
          <PaginationEllipsis v-if="totalPages > 5 && currentPage > 3" />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currentPage">
              {{ item.value }}
            </PaginationItem>
          </template>
          <PaginationEllipsis v-if="totalPages > 5 && currentPage < totalPages - 2" />
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
