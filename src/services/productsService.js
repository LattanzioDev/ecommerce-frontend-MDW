import api from './api';

export const getProducts = () => api.get('/products');  // Pública, pero api maneja si hay token

export const createProduct = (product) => api.post('/products', product);

export const updateProduct = (id, product) => api.put(`/products/${id}`, product);

export const deleteProduct = (id) => api.delete(`/products/${id}`);