import { defineStore } from "pinia";
import type { Shipment } from "@/types/shipment";

export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipments: [] as Shipment[],
    transporters: [] as { id: string; name: string }[],
  }),
});
