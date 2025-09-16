// API Endpoints configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Admin endpoints
  ADMIN: {
    // Vendor management
    VENDORS: '/api/admin/vendors',
    VENDOR_BY_ID: (id: string) => `/api/admin/vendors/${id}`,
    VENDOR_STATUS: (id: string) => `/api/admin/vendors/${id}/status`,
    VENDOR_STATISTICS: '/api/admin/vendors/statistics',
    
    // User management
    USERS: '/api/admin/users',
    USER_BY_ID: (id: string) => `/api/admin/users/${id}`,
    USER_STATISTICS: '/api/admin/users/statistics',
    
    // Children management
    CHILDREN: '/api/admin/children',
    CHILD_BY_ID: (id: string) => `/api/admin/children/${id}`,
    CHILDREN_STATISTICS: '/api/admin/children/statistics',
    
    // Products management
    PRODUCTS: '/api/admin/products',
    PRODUCT_BY_ID: (id: string) => `/api/admin/products/${id}`,
    PRODUCT_STATISTICS: '/api/admin/products/statistics',
    
    // Orders management
    ORDERS: '/api/admin/orders',
    ORDER_BY_ID: (id: string) => `/api/admin/orders/${id}`,
    ORDER_STATISTICS: '/api/admin/orders/statistics',
    
    // Analytics
    ANALYTICS: '/api/admin/analytics',
    DASHBOARD_STATS: '/api/admin/analytics/dashboard',
  },

  // Vendor endpoints
  VENDOR: {
    PROFILE: '/vendor/profile',
    UPDATE_PROFILE: '/vendor/profile',
    PRODUCTS: '/vendor/products',
    PRODUCT_BY_ID: (id: string) => `/vendor/products/${id}`,
    ORDERS: '/vendor/orders',
    ORDER_BY_ID: (id: string) => `/vendor/orders/${id}`,
    STATISTICS: '/vendor/statistics',
    DASHBOARD: '/vendor/dashboard',
  },

  // Public endpoints
  PUBLIC: {
    VENDOR_REGISTER: '/vendor/register',
    CONTACT: '/contact',
    ABOUT: '/about',
  }
} as const

export type ApiEndpoint = typeof API_ENDPOINTS