import axios from 'axios'
import { getSession } from 'next-auth/react'
// import { useSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5001'

// Add timeout and retry configuration for production
const isProduction = process.env.NODE_ENV === 'production'

// Handle mixed content issues (HTTPS site calling HTTP API)
const isHttpsSite = typeof window !== 'undefined' && window.location.protocol === 'https:'
const isHttpApi = API_BASE_URL.startsWith('http://')
const hasMixedContentIssue = isHttpsSite && isHttpApi

if (hasMixedContentIssue) {
  console.warn('⚠️ Mixed Content Warning: HTTPS site trying to call HTTP API. This may cause authentication issues.')
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
  timeout: isProduction ? 30000 : 10000, // Longer timeout for production
  // Add additional configuration for mixed content handling
  withCredentials: false, // Disable credentials for cross-origin requests
  validateStatus: function (status) {
    // Accept any status code as valid to handle errors properly
    return status >= 200 && status < 600
  }
})

// Request interceptor for authentication and logging
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Add auth token if available (only in browser environment)
      if (typeof window !== 'undefined') {
        // First try to get token from localStorage (for backward compatibility)
        let token = localStorage.getItem('authToken')
        // If no token in localStorage, try to get it from NextAuth session
        if (!token) {
          try {
            const session = await getSession()
            // Check if the session has a token (this would need to be added to the session)
            token = session?.token as string
            
            // If we got a token from session, store it in localStorage for future requests
            if (token) {
              localStorage.setItem('authToken', token)
            }
          } catch (error) {
            // Silent error handling for session retrieval
            console.warn('Failed to get session token:', error)
          }
        }
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      
      return config
    } catch (error) {
      console.error('Request interceptor error:', error)
      return config
    }
  },
  (error) => {
    console.error('Request interceptor setup error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle mixed content errors
    if (error.code === 'ERR_BLOCKED_BY_CLIENT' || error.message?.includes('Mixed Content')) {
      console.error('🚫 Mixed Content Error: HTTPS site cannot call HTTP API. Please use HTTPS for your API.')
      return Promise.reject(new Error('Mixed Content Error: API must use HTTPS'))
    }
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('🌐 Network Error: Unable to connect to API server')
      return Promise.reject(new Error('Network Error: Unable to connect to API server'))
    }
    
    // Handle unauthorized access
    if (error.response?.status === 401) {
      // Clear token and redirect to login (only in browser environment)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        // Only redirect if not already on an auth page to prevent loops
        if (!window.location.pathname.startsWith('/auth/')) {
          window.location.href = '/auth/signin'
        }
      }
    }
    
    return Promise.reject(error)
  }
)