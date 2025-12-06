import { createRouter, createWebHistory } from 'vue-router';
import Products from '../pages/Products.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import AdminProducts from '@/pages/admin/AdminProducts.vue';
import AdminOrders from '@/pages/admin/AdminOrders.vue';

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: Products },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path:'/admin/products', component: AdminProducts },
  { path: '/admin/orders', component: AdminOrders }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;