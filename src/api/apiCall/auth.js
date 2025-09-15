import httpClient from '../httpClient.js';
import { API_ENDPOINTS } from '../endpoints.js';

// Authentication API calls
export const loginApi = async (credentials) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await httpClient.post('/api/auth/refresh');
    return response.data;
  } catch (error) {
    throw error;
  }
};
