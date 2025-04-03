import axios from 'axios';
import { LoginForm, RegisterForm, AuthResponse, Product } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (data: LoginForm) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  register: async (data: RegisterForm) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Product) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: Product) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  }
};
