import { defineStore } from "pinia";
import shipmentData from "@/data/shipments.json";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  route: string;
  vehicle_type: string;
  assigned_transporter: string | null;
}

export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipments: shipmentData as Shipment[],
    transporters: [
      { id: "T001", name: "PT. Jaya Logistics" },
      { id: "T002", name: "PT. Nusantara Express" },
      { id: "T003", name: "PT. Cargo Fast" },
    ],
  }),
  actions: {
    toggleRandomStatus() {
      this.shipments = this.shipments.map((shipment) => {
        const newStatus = Math.random() > 0.5 ? "Assigned" : "Not Assigned";
        const assignedTransporter = newStatus === "Assigned" ? this.transporters[Math.floor(Math.random() * this.transporters.length)].name : null;
        console.log(shipment)
        return { ...shipment, status: newStatus, assigned_transporter: assignedTransporter };
      });
    },
  },
});
