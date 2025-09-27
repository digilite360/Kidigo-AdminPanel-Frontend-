import { apiClient } from '../client'
import { UserApiResponse, UserFilters, User } from '@/types'

export const userService = {
  /**
   * Get all users with pagination and filters
   */
  async getUsers(filters: UserFilters = {}): Promise<UserApiResponse> {
    const params = new URLSearchParams()
    
    // Add pagination parameters
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    
    // Add sorting parameters
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
    
    // Add filter parameters
    if (filters.role) params.append('role', filters.role)
    if (filters.isVerified !== undefined) params.append('isVerified', filters.isVerified.toString())
    if (filters.search) params.append('search', filters.search)

    const response = await apiClient.get(`/api/users?${params.toString()}`)
    return response.data
  },

  /**
   * Get a single user by ID
   */
  async getUserById(id: string): Promise<{ status: string; message: string; data: { user: User } }> {
    const response = await apiClient.get(`/api/users/${id}`)
    return response.data
  },

  /**
   * Update user status or role
   */
  async updateUser(id: string, updates: {
    role?: string
    isVerified?: boolean
    name?: string
  }): Promise<{ status: string; message: string; data: { user: User } }> {
    const response = await apiClient.patch(`/api/users/${id}`, updates)
    return response.data
  },

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<{ status: string; message: string }> {
    const response = await apiClient.delete(`/api/users/${id}`)
    return response.data
  },

}