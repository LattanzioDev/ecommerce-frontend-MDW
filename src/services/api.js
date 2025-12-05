import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommerce-backend-mdw.vercel.app/api',
    timeout: 30000,
    withCredentials: true, // ← permite enviar cookies HTTP-only
});

// Quitar Authorization porque tu backend NO usa Bearer tokens
// Safari bloquea cookies cuando mezclas tokens + cookies en cross-site
api.interceptors.request.use((config) => {
    // No enviar Authorization → Solo usar cookies HttpOnly
    return config;
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

export default api;