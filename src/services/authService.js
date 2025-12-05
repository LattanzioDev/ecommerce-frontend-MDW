import api from './api';

export const loginUser = (credentials) =>
    api.post('/auth/login', credentials, {
        withCredentials: true, // redundante pero más seguro
    });

export const registerUser = (data) =>
    api.post('/auth/register', data, {
        withCredentials: true,
    });

export const fetchCurrentUser = () =>
    api.get('/auth/me', {withCredentials: true});