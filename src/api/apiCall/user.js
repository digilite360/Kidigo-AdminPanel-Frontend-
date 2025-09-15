import httpClient from '../httpClient.js';
import { API_ENDPOINTS } from '../endpoints.js';

// User API calls
export const getUsersApi = async (params = {}) => {
  try {
    // Default pagination parameters
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params
    };
    
    const response = await httpClient.get(API_ENDPOINTS.USERS, { 
      params: defaultParams,
      headers: {
        'accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdApi = async (userId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.USERS}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserApi = async (userData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.USERS, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (userId, userData) => {
  try {
    const response = await httpClient.put(`${API_ENDPOINTS.USERS}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const response = await httpClient.delete(`${API_ENDPOINTS.USERS}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfileApi = async () => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.USER_PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
};
