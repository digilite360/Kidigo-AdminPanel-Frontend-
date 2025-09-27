import axios from 'axios'
import { getSession } from 'next-auth/react'
// import { useSession } from 'next-auth/react'

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
        } catch {
          // Silent error handling
        }
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
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