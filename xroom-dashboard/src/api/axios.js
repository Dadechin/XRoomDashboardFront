// src/api/axios.js
import axios from 'axios';
import { API_BASE_URL } from '@/config'; // Adjust the path if needed

const token = localStorage.getItem('token');
const apiClient = axios.create({
  baseURL: API_BASE_URL, // All requests will prepend this URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`,

  },
});

export default apiClient;