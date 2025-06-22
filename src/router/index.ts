import ShipmentDetail from "@/components/ShipmentDetail.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Shipment from "@/pages/Shipment.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "ShipmentList",
    component: Shipment,
    meta: { requiresAuth: true },
  },
  {
    path: "/shipment/:id",
    name: "ShipmentDetail",
    component: ShipmentDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: (_to: any) => {
      const role = localStorage.getItem("role");
      return role ? "/" : "/login";
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role");

  if (to.meta.requiresAuth && !role) {
    next("/login");
    return;
  }

  if (to.path === "/login" && role) {
    next(from.fullPath !== "/login" ? from.fullPath : "/");
    return;
  }

  next();
});

export default router;
