import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../pages/SignupPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ResetPassword from '../pages/ResetPassword.vue'
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
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword
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
  },
  {
    path: '/dashboard/readyPlayer',
    name: 'ReadyPlayer',
    component: () => import('@/pages/dashboard/readyPlayer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/ChangeAvatar',
    name: 'ChangeAvatar',
    component: () => import('@/pages/dashboard/ChangeAvatar.vue'),
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
      // Make getInfo request
      const response = await axios.get('/getInfo');
      
      // Save customer and user data to localStorage
      if (response.data?.customer) {
        localStorage.setItem('customer', JSON.stringify(response.data.customer));
      }
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      localStorage.setItem('baseUrl','http://194.62.43.230:8000');
      
      // If trying to access login page while authenticated, redirect to dashboard
      if (to.path === '/login') {
        return next('/dashboard');
      }
      
      // Check if profile_glb is empty and not already going to ChangeAvatar
      const customer = response.data.customer || JSON.parse(localStorage.getItem('customer') || '{}');
      if (!customer.profile_glb && to.name !== 'ChangeAvatar') {
        return next('/dashboard/ChangeAvatar');
      }
      
      return next();
    } catch (err) {
      // Invalid token, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('customer');
      return next('/login');
    }
  }
  
  next();
});
export default router