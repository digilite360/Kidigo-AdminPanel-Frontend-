// Application Constants
export const APP_NAME = "Kidigo Admin Panel"
export const APP_DESCRIPTION = "Admin panel for Kidigo application"

// Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    ERROR: "/auth/error",
  },
  ADMIN: "/admin",
  UNAUTHORIZED: "/unauthorized",
  PROFILE: "/dashboard/profile",
  SETTINGS: "/dashboard/settings",
  USERS: "/dashboard/users",
  PRODUCTS: "/dashboard/products",
  ORDERS: "/dashboard/orders",
  ANALYTICS: "/dashboard/analytics",
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  USERS: "/api/users",
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
} as const
