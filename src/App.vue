<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css"; // vue-sonner v2 requires this import
</script>

<template>
  <Toaster />

  <!-- Nuxt, vue-sonner v1 because inserting inline CSS with JS to the head tag -->
  <ClientOnly>
    <router-view />
    <Toaster />
  </ClientOnly>

  <!-- Nuxt, vue-sonner v2 no need to ClientOnly -->
  <Toaster />
</template>
