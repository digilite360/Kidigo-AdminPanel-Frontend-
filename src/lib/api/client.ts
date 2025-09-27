import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:5001'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for authentication and logging
apiClient.interceptors.request.use(
  async (config) => {
    // Add auth token if available (only in browser environment)
    if (typeof window !== 'undefined') {
      // First try to get token from localStorage (for backward compatibility)
      let token = localStorage.getItem('authToken')
      console.log('API Client - localStorage token:', token ? 'Found' : 'Not found')
      
      // If no token in localStorage, try to get it from NextAuth session
      if (!token) {
        try {
          const session = await getSession()
          console.log('API Client - Session:', session ? 'Found' : 'Not found')
          console.log('API Client - Session token:', session?.token ? 'Found' : 'Not found')
          console.log('API Client - Full session:', session)
          // Check if the session has a token (this would need to be added to the session)
          token = session?.token as string
          
          // If we got a token from session, store it in localStorage for future requests
          if (token) {
            localStorage.setItem('authToken', token)
            console.log('API Client - Token stored in localStorage from session')
          }
        } catch (error) {
          console.warn('Failed to get session for API request:', error)
        }
      }
      
      console.log('API Client - Final token:', token ? 'Found' : 'Not found')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('API Client - Authorization header set')
      } else {
        console.warn('API Client - No authentication token available')
      }
    }
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        hasAuth: !!config.headers.Authorization,
      })
    }
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
    
    // Handle unauthorized access
    if (error.response?.status === 401) {
      // Clear token and redirect to login (only in browser environment)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        window.location.href = '/auth/signin'
      }
    }
    
    return Promise.reject(error)
  }
)