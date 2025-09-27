import { apiClient } from '../client'
import { LoginRequest, LoginResponse, ApiError, ApiLoginResponse } from '@/types'

export interface AuthRegisterRequest {
  email: string
  password: string
  role: string
}

export interface AuthRegisterResponse {
  message: string
  user?: {
    id: string
    email: string
    role: string
    createdAt: string
  }
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      
      const response = await apiClient.post<ApiLoginResponse>('/api/auth/login', data)
      
      // Extract data from the nested response structure
      const responseData = response.data.data || response.data
      const transformedResponse: LoginResponse = {
        success: response.data.status === 'success',
        message: response.data.message,
        user: responseData.user ? {
          id: responseData.user.id,
          email: responseData.user.email,
          name: responseData.user.name || responseData.user.vendorName,
          role: responseData.user.role
        } : undefined,
        token: responseData.token
      }
      
      
      return transformedResponse
    } catch (error: any) {
      const errorDetails = {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        errors: error.response?.data?.errors,
        url: error.config?.url,
        method: error.config?.method
      }
      
      console.error('Auth Service - Login Error:', errorDetails)
      
      // Create a structured error object
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Login failed',
        status: error.response?.status,
        errors: error.response?.data?.errors
      }
      
      throw apiError
    }
  },

  async register(data: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    try {
      
      const response = await apiClient.post<AuthRegisterResponse>('/api/auth/register', data)
      
      return response.data
    } catch (error: any) {
      throw error
    }
  }
}