import ShipmentDetail from "@/components/ShipmentDetail.vue";
import ShipmentList from "@/components/ShipmentList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "ShipmentList",
    component: ShipmentList,
  },
  {
    path: "/shipment/:id",
    name: "ShipmentDetail",
    component: ShipmentDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
