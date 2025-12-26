import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/client/HomeView.vue'
import BrandsView from '../views/client/BrandsView.vue'
import CamerasView from '../views/client/CamerasView.vue'
import LensesView from '../views/client/LensesView.vue'
import AdminView from '../views/admin/AdminView.vue'
import LoginView from '../views/auth/LoginView.vue'

// 路由守卫
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView,
    },
    {
      path: '/cameras',
      name: 'cameras',
      component: CamerasView,
    },
    {
      path: '/lenses',
      name: 'lenses',
      component: LensesView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: requireAuth,
    },
  ],
})

export default router
