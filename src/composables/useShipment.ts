import { ref } from "vue";
import shipmentData from "@/data/shipments.json";
import type { Shipment } from "@/types/shipment";

const shipments = ref<Shipment[]>([]);
const transporters = ref([
  { id: "T001", name: "PT. Jaya Logistics" },
  { id: "T002", name: "PT. Nusantara Express" },
  { id: "T003", name: "PT. Cargo Fast" },
]);

export function useShipment() {
  const fetchShipments = () => {
    shipments.value = shipmentData as Shipment[];
  };

  const toggleRandomStatus = () => {
    shipments.value = shipments.value.map((shipment) => {
      const newStatus = Math.random() > 0.5 ? "Assigned" : "Not Assigned";
      const assignedTransporter = newStatus === "Assigned" ? transporters.value[Math.floor(Math.random() * transporters.value.length)].name : null;

      return {
        ...shipment,
        status: newStatus,
        assigned_transporter: assignedTransporter,
      };
    });
  };

  return {
    shipments,
    transporters,
    fetchShipments,
    toggleRandomStatus,
  };
}
