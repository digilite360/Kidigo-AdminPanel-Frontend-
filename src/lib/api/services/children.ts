import httpClient from '../../../api/httpClient.js'
import { ChildrenApiResponse, ChildrenFilters } from '@/types'

export const childrenService = {
  /**
   * Get all children with optional filters
   */
  async getChildren(filters: ChildrenFilters = {}): Promise<ChildrenApiResponse> {
    try {
      const params = new URLSearchParams()
      
      // Add pagination params
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())
      
      // Add sorting params
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
      
      // Add filter params
      if (filters.gender) params.append('gender', filters.gender)
      if (filters.ageGroup) {
        // Convert age group to ageMax parameter
        const ageMaxMap: Record<string, number> = {
          '0-5': 5,
          '6-10': 10,
          '11-15': 15,
          '16-18': 18
        }
        const ageMax = ageMaxMap[filters.ageGroup]
        if (ageMax) {
          params.append('ageMax', ageMax.toString())
        }
      }
      if (filters.ageMax) params.append('ageMax', filters.ageMax.toString())
      if (filters.class) params.append('class', filters.class)
      if (filters.search) params.append('search', filters.search)

      const response = await httpClient.get(`/api/admin/children?${params.toString()}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },

  /**
   * Get a single child by ID
   */
  async getChildById(id: string): Promise<{ status: string; message: string; data: any }> {
    const response = await httpClient.get(`/api/admin/children/${id}`)
    return response.data
  },

  /**
   * Create a new child
   */
  async createChild(childData: any): Promise<{ status: string; message: string; data: any }> {
    const response = await httpClient.post('/api/admin/children', childData)
    return response.data
  },

  /**
   * Update a child
   */
  async updateChild(id: string, childData: any): Promise<{ status: string; message: string; data: any }> {
    const response = await httpClient.put(`/api/admin/children/${id}`, childData)
    return response.data
  },

  /**
   * Delete a child
   */
  async deleteChild(id: string): Promise<{ status: string; message: string }> {
    const response = await httpClient.delete(`/api/admin/children/${id}`)
    return response.data
  }
}
