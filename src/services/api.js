import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-api-mdw.onrender.com/api',
  timeout: 30000, 
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.log('Backend durmiendo en Render... reintentando en 3 segundos');
      await new Promise(resolve => setTimeout(resolve, 3000));
      return api(error.config); 
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
