import axios from 'axios';
import { AuthResponse } from '../../types/auth';

const api = axios.create({
  baseURL: '/api/auth'
});

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await api.post('/login', { email, password });
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid email or password');
    }
    throw new Error('Login failed. Please try again.');
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post('/register', { name, email, password });
    return data;
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error('Email already registered');
    }
    throw new Error('Registration failed. Please try again.');
  }
};

export const verifyToken = async (token: string): Promise<AuthResponse['user']> => {
  try {
    const { data } = await api.get('/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    throw new Error('Invalid token');
  }
};