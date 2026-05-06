import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
});

// Interceptor para inyectar el Token JWT en todas las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('iam_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.success) {
        localStorage.setItem('iam_token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('iam_token');
};

export const getUsuarios = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getAuditLogs = async () => {
    const response = await api.get('/users/audit-logs');
    return response.data;
};

export default api;
