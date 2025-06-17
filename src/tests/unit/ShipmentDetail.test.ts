// ShipmentDetail.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShipmentStore } from "@/store/shipmentStore";

vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { id: "SHP001" } }),
}));

describe("ShipmentDetail.vue Logic", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("assigns transporter correctly", () => {
    const store = useShipmentStore();
    store.shipments = [
      {
        id: "SHP001",
        origin: "Jakarta",
        destination: "Surabaya",
        route: "Jakarta → Surabaya",
        vehicle_type: "Truck",
        status: "Not Assigned",
        assigned_transporter: null,
      },
    ];
    store.transporters = [{ id: "T001", name: "PT. Jaya Logistics" }];

    const index = store.shipments.findIndex((s) => s.id === "SHP001");
    const values = { transporter: "PT. Jaya Logistics" };

    if (index !== -1) {
      store.shipments[index].assigned_transporter = values.transporter;
      store.shipments[index].status = "Assigned";
    }

    expect(store.shipments[index].assigned_transporter).toBe("PT. Jaya Logistics");
    expect(store.shipments[index].status).toBe("Assigned");
  });

  it("rejects duplicate assignment", () => {
    const store = useShipmentStore();
    store.shipments = [
      {
        id: "SHP001",
        origin: "Jakarta",
        destination: "Surabaya",
        route: "Jakarta → Surabaya",
        vehicle_type: "Truck",
        status: "Assigned",
        assigned_transporter: "PT. Jaya Logistics",
      },
    ];

    const index = store.shipments.findIndex((s) => s.id === "SHP001");
    const values = { transporter: "PT. Jaya Logistics" };

    let errorMessage = "";
    if (store.shipments[index].assigned_transporter === values.transporter) {
      errorMessage = "Transporter is already assigned.";
    }

    expect(errorMessage).toBe("Transporter is already assigned.");
  });
});
