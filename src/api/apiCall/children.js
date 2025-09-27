import httpClient from '../httpClient.js';
import { apiClient } from '../../lib/api/client';
import { API_ENDPOINTS } from '../endpoints.js';

// Children API calls
export const getChildrenApi = async (params = {}) => {
  try {
    // Default pagination parameters
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params
    };
    
    const response = await httpClient.get(API_ENDPOINTS.CHILDREN, { 
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

export const getChildByIdApi = async (childId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.CHILDREN}/${childId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createChildApi = async (childData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.CHILDREN, childData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateChildApi = async (childId, childData) => {
  try {
    const response = await httpClient.put(`${API_ENDPOINTS.CHILDREN}/${childId}`, childData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChildApi = async (childId) => {
  try {
    const response = await httpClient.delete(`${API_ENDPOINTS.CHILDREN}/${childId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChildProfileApi = async (childId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.CHILD_PROFILE}/${childId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChildrenByParentApi = async (parentId, params = {}) => {
  try {
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params
    };
    
    const response = await httpClient.get(`${API_ENDPOINTS.CHILDREN}/parent/${parentId}`, { 
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

export const getChildrenStatisticsApi = async () => {
  try {
    // Check if we have a token in localStorage
    // const token = localStorage.getItem('authToken');
    
    const response = await apiClient.get(API_ENDPOINTS.CHILDREN_STATISTICS, {
      headers: {
        'accept': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};