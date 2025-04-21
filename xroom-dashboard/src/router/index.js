import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../pages/SignupPage.vue' // Renamed
import LoginPage from '../pages/LoginPage.vue'   // Renamed
import DashboardPage from '../pages/dashboard/index.vue'    
import FilesPage from '@/pages/dashboard/files.vue'; // import the new page
import axios from '@/axios';

const routes = [
  {
    path: '/signup',
    name: 'SignupPage', // Renamed
    component: SignupPage
  },
  {
    path: '/login',
    name: 'LoginPage', // Renamed
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage', // Renamed
    component: DashboardPage
  },{
    path: '/dashboard/files',
    name: 'files',
    component: FilesPage, // link the files page
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');

  // No token, redirect to login if trying to access dashboard
  if (to.path === '/dashboard' && !token) {
    return next('/login');
  }

  if (token) {
    try {
      await axios.get('/getInfo');
      if (to.path === '/login') {
        return next('/dashboard');
      }
      return next();
    } catch (err) {
      // Invalid token, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return next('/login');
    }
  }

  next();
});


export default router
