import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommerce-backend-mdw.vercel.app/api',
    timeout: 30000,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

export default api;