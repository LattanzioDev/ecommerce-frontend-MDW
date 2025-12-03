import api from './api';

export const getProducts = () => api.get('/products'); // Pública
export const createProduct = (product) => api.post('/products', product); // Privada
export const updateProduct = (id, product) => api.put(`/products/${id}`, product); // Privada
export const deleteProduct = (id) => api.delete(`/products/${id}`); // Privada