<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { z } from "zod";
import { useForm } from "vee-validate";
import { FormField, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { useShipment } from "@/composables/useShipment";

const { shipments, transporters } = useShipment();
const route = useRoute();
const shipmentId = route.params.id as string;
const shipment = computed(() => shipments.value.find((s) => s.id === shipmentId));

const formSchema = toTypedSchema(
  z.object({
    transporter: z.string().min(1, "Transporter is required"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  if (!values) {
    toast.error("Invalid submission.");
    return;
  }

  const index = shipments.value.findIndex((s) => s.id === shipmentId);
  if (index !== -1) {
    if (shipments.value[index].assigned_transporter === values.transporter) {
      toast.error("Transporter is already assigned.");
      return;
    }
    shipments.value[index].assigned_transporter = values.transporter;
    shipments.value[index].status = "Assigned";
    toast.success("Transporter assigned successfully.");
  } else {
    toast.error("Shipment not found.");
  }
});
</script>

<template>
  <div class="p-4">
    <router-link to="/" class="text-gray-600 hover:text-gray-800 hover:underline">← Back to Shipments</router-link>
    <div v-if="shipment" class="mt-4 bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 class="text-xl font-bold mb-2">Shipment Detail: {{ shipment.id }}</h2>
      <div class="text-gray-700 mb-1">Route: {{ shipment.route }}</div>
      <div class="text-gray-700 mb-1">Vehicle Type: {{ shipment.vehicle_type }}</div>
      <div class="text-gray-700 mb-4">Status: {{ shipment.status }}</div>
      <div v-if="shipment.assigned_transporter" class="text-gray-700 mb-1">Assigned Transporter: {{ shipment.assigned_transporter }}</div>

      <form v-if="shipment.status !== 'Assigned'" :validation-schema="formSchema" @submit="onSubmit" class="space-y-2 mt-5">
        <FormField v-slot="{ componentField }" name="transporter">
          <FormLabel>Assign Transporter</FormLabel>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select transporter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="transporter in transporters" :key="transporter.id" :value="transporter.name">
                {{ transporter.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormField>

        <Button class="cursor-pointer" type="submit">Assign</Button>
      </form>
    </div>
    <div v-else class="text-gray-600 mt-6">Shipment not found.</div>
  </div>
</template>
