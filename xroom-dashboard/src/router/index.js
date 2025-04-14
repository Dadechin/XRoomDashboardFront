import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../components/SignupPage.vue' // Renamed
import LoginPage from '../components/LoginPage.vue'   // Renamed
import DashboardPage from '../components/DashboardPage.vue'    
import FilesPage from '@/components/FilesPage.vue'; // import the new page

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
    path: '/files',
    name: 'files',
    component: FilesPage, // link the files page
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
