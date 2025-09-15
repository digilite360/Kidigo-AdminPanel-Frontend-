// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  
  // User endpoints
  USERS: '/api/users',
  USER_PROFILE: '/api/users/profile',
  USER_UPDATE: '/api/users/update',
  
  // Children endpoints
  CHILDREN: '/api/children',
  CHILD_PROFILE: '/api/children/profile',
  CHILD_UPDATE: '/api/children/update',
  
  // Vendor endpoints
  VENDORS: '/api/vendors',
  VENDOR_PROFILE: '/api/vendors/profile',
  VENDOR_UPDATE: '/api/vendors/update',
  VENDOR_REGISTER: '/api/vendors/register',
  
  // Example endpoints
  DASHBOARD: '/api/dashboard',
  ANALYTICS: '/api/analytics',
};

// Base URL configuration
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
