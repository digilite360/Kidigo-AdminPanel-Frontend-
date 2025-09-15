import httpClient from '../httpClient.js';
import { API_ENDPOINTS } from '../endpoints.js';

// Vendors API calls
export const getVendorsApi = async (params = {}) => {
  try {
    // Default pagination parameters
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params
    };
    
    const response = await httpClient.get(API_ENDPOINTS.VENDORS, { 
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

export const getVendorByIdApi = async (vendorId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.VENDORS}/${vendorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVendorApi = async (vendorData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.VENDORS, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVendorApi = async (vendorId, vendorData) => {
  try {
    const response = await httpClient.put(`${API_ENDPOINTS.VENDORS}/${vendorId}`, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVendorApi = async (vendorId) => {
  try {
    const response = await httpClient.delete(`${API_ENDPOINTS.VENDORS}/${vendorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVendorProfileApi = async (vendorId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.VENDOR_PROFILE}/${vendorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerVendorApi = async (vendorData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.VENDOR_REGISTER, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyVendorApi = async (vendorId) => {
  try {
    const response = await httpClient.post(`${API_ENDPOINTS.VENDORS}/${vendorId}/verify`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const suspendVendorApi = async (vendorId, reason) => {
  try {
    const response = await httpClient.post(`${API_ENDPOINTS.VENDORS}/${vendorId}/suspend`, { reason });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateVendorApi = async (vendorId) => {
  try {
    const response = await httpClient.post(`${API_ENDPOINTS.VENDORS}/${vendorId}/activate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVendorStatsApi = async (vendorId) => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.VENDORS}/${vendorId}/stats`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVendorProductsApi = async (vendorId, params = {}) => {
  try {
    const defaultParams = {
      page: 1,
      limit: 10,
      ...params
    };
    
    const response = await httpClient.get(`${API_ENDPOINTS.VENDORS}/${vendorId}/products`, { 
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
