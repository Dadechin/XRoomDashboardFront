import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../pages/SignupPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/dashboard/index.vue'    
import FilesPage from '@/pages/dashboard/files.vue';
import axios from '@/axios';

const routes = [
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/files',
    name: 'files',
    component: FilesPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/edit-profile',
    name: 'EditProfile',
    component: () => import('@/pages/dashboard/EditProfile.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // If route doesn't require auth, continue
  if (!requiresAuth) {
    return next();
  }
  
  // If route requires auth but no token, redirect to login
  if (requiresAuth && !token) {
    return next('/login');
  }
  
  // If we have a token and it's an auth route, verify it
  if (token) {
    try {
      await axios.get('/getInfo');
      
      // If trying to access login page while authenticated, redirect to dashboard
      if (to.path === '/login') {
        return next('/dashboard');
      }
      
      return next();
    } catch (err) {
      // Invalid token, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return next('/login');
    }
  }
  
  next();
});

export default router