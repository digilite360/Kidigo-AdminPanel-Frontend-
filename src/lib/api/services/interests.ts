import { apiClient } from '../client'
import { API_ENDPOINTS } from '../endpoints'

// Interest interface
export interface Interest {
  id: string
  interest: string
  description?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Interest filters interface
export interface InterestFilters {
  page?: number
  limit?: number
  search?: string
  category?: string
  priority?: string
  status?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Interest pagination interface
export interface InterestPagination {
  currentPage: number
  totalPages: number
  totalInterests: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Interest statistics interface
export interface InterestStatistics {
  totalInterests: number
  activeInterests: number
  inactiveInterests: number
  highPriorityInterests: number
  mediumPriorityInterests: number
  lowPriorityInterests: number
}

// API response interface
export interface InterestResponse {
  status: 'success' | 'error'
  message?: string
  data?: {
    interests: Interest[]
    pagination: InterestPagination
    statistics?: InterestStatistics
  }
}

// Create interest request interface
export interface CreateInterestRequest {
  interest: string
  description?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'active' | 'inactive'
}

// Update interest request interface
export interface UpdateInterestRequest {
  interest?: string
  description?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'active' | 'inactive'
}

export const interestService = {
  // Get all interests with filters
  async getInterests(filters: InterestFilters = {}): Promise<InterestResponse> {
    try {
      const params = new URLSearchParams()
      
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.search) params.append('search', filters.search)
      if (filters.category) params.append('category', filters.category)
      if (filters.priority) params.append('priority', filters.priority)
      if (filters.status) params.append('status', filters.status)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.INTERESTS}?${params.toString()}`)
      return response.data
    } catch (error: unknown) {
      console.error('Error fetching interests:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch interests')
    }
  },

  // Get interest by ID
  async getInterestById(id: string): Promise<InterestResponse> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.INTEREST_BY_ID(id))
      return response.data
    } catch (error: unknown) {
      console.error('Error fetching interest:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch interest')
    }
  },

  // Create new interest
  async createInterest(interestData: CreateInterestRequest): Promise<InterestResponse> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ADMIN.INTERESTS, interestData)
      return response.data
    } catch (error: unknown) {
      console.error('Error creating interest:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create interest')
    }
  },

  // Update interest
  async updateInterest(id: string, interestData: UpdateInterestRequest): Promise<InterestResponse> {
    try {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN.INTEREST_BY_ID(id), interestData)
      return response.data
    } catch (error: unknown) {
      console.error('Error updating interest:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to update interest')
    }
  },

  // Delete interest
  async deleteInterest(id: string): Promise<InterestResponse> {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.ADMIN.INTEREST_BY_ID(id))
      return response.data
    } catch (error: unknown) {
      console.error('Error deleting interest:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to delete interest')
    }
  },

  // Get interest statistics
  async getInterestStatistics(): Promise<InterestResponse> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.INTEREST_STATISTICS)
      return response.data
    } catch (error: unknown) {
      console.error('Error fetching interest statistics:', error)
      throw new Error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch interest statistics')
    }
  }
}
