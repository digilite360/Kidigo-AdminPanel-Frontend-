import { apiClient } from '../client'
import { VendorApiResponse, VendorFilters, Vendor } from '@/types'

export const vendorService = {
  /**
   * Get all vendors with pagination and filters
   */
  async getVendors(filters: VendorFilters = {}): Promise<VendorApiResponse> {
    const params = new URLSearchParams()
    
    // Add pagination parameters
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    
    // Add sorting parameters
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
    
    // Add filter parameters
    if (filters.search) params.append('search', filters.search)
    if (filters.isVerified !== undefined) params.append('isVerified', filters.isVerified.toString())
    if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString())
    if (filters.isApproved !== undefined) params.append('isApproved', filters.isApproved.toString())
    if (filters.businessType) params.append('businessType', filters.businessType)
    if (filters.city) params.append('city', filters.city)
    if (filters.state) params.append('state', filters.state)
    if (filters.country) params.append('country', filters.country)

    const response = await apiClient.get(`/api/admin/vendors?${params.toString()}`)
    return response.data
  },

  /**
   * Get a single vendor by ID
   */
  async getVendorById(id: string): Promise<{ status: string; message: string; data: { vendor: Vendor } }> {
    const response = await apiClient.get(`/api/admin/vendors/${id}`)
    return response.data
  },

  /**
   * Update vendor status (approve, reject, suspend, etc.)
   */
  async updateVendorStatus(id: string, status: {
    isApproved?: boolean
    isActive?: boolean
    isVerified?: boolean
  }): Promise<{ status: string; message: string; data: { vendor: Vendor } }> {
    const response = await apiClient.patch(`/api/admin/vendors/${id}/status`, status)
    return response.data
  },

  /**
   * Delete a vendor
   */
  async deleteVendor(id: string): Promise<{ status: string; message: string }> {
    const response = await apiClient.delete(`/api/admin/vendors/${id}`)
    return response.data
  },

  /**
   * Get vendor statistics
   */
  async getVendorStatistics(): Promise<{
    status: string
    message: string
    data: {
      totalVendors: number
      activeVendors: number
      pendingVendors: number
      verifiedVendors: number
      approvedVendors: number
      vendorsByStatus: Record<string, number>
      vendorsByLocation: Record<string, number>
    }
  }> {
    const response = await apiClient.get('/api/admin/vendors/statistics')
    return response.data
  }
}