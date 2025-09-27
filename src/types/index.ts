import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
    token?: string
  }

  interface User extends DefaultUser {
    role: string
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string
    authToken?: string
  }
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface BusinessAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Vendor {
  id: string
  email: string
  vendorName: string
  businessName: string
  businessPhone: string
  businessAddress: BusinessAddress
  businessDescription?: string
  businessWebsite?: string
  businessDocuments?: Record<string, any>
  role: string
  isVerified: boolean
  isActive: boolean
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface VendorRegistrationData {
  email: string
  password: string
  vendorName: string
  businessName: string
  businessPhone: string
  businessAddress: BusinessAddress
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isVendor: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
    role: string
  }
  token?: string
}

// Raw API response structure
export interface ApiLoginResponse {
  status: string
  message: string
  data: {
    token: string
    user: {
      id: string
      email: string
      name?: string
      vendorName?: string
      role: string
    }
  }
}

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

// Child related interfaces
export interface Child {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  class: string
  hobbies: string[]
  interests: string[]
  user: {
    id: string
    email: string
    isVerified: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface ChildrenStatistics {
  totalChildren: number
  childrenByGender: {
    male: number
    female: number
    other: number
  }
  childrenByAgeGroup: {
    '0-5': number
    '6-10': number
    '11-15': number
    '16-18': number
  }
  childrenByClass: Record<string, number>
  verifiedUsers: number
  unverifiedUsers: number
}

export interface ChildrenPagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

export interface ChildrenApiResponse {
  status: string
  message: string
  data: {
    children: Child[]
    statistics: ChildrenStatistics
    pagination: ChildrenPagination
  }
}

export interface ChildrenFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  gender?: 'male' | 'female' | 'other'
  ageGroup?: '0-5' | '6-10' | '11-15' | '16-18'
  ageMax?: number
  class?: string
  search?: string
}

// Vendor related interfaces
export interface VendorPagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

export interface VendorApiResponse {
  status: string
  message: string
  data: {
    vendors: Vendor[]
    pagination: VendorPagination
  }
}

export interface VendorFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  isVerified?: boolean
  isActive?: boolean
  isApproved?: boolean
  businessType?: string
  city?: string
  state?: string
  country?: string
}

// User related interfaces
export interface UserPagination {
  currentPage: number
  totalPages: number
  totalUsers: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface UserApiResponse {
  status: string
  message: string
  data: {
    users: User[]
    pagination: UserPagination
  }
}

export interface UserFilters {
  page?: number
  limit?: number
  role?: string
  isVerified?: boolean
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Interest related interfaces
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

export interface InterestStatistics {
  totalInterests: number
  activeInterests: number
  inactiveInterests: number
  highPriorityInterests: number
  mediumPriorityInterests: number
  lowPriorityInterests: number
}

export interface InterestPagination {
  currentPage: number
  totalPages: number
  totalInterests: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface InterestApiResponse {
  status: string
  message: string
  data: {
    interests: Interest[]
    pagination: InterestPagination
    statistics?: InterestStatistics
  }
}

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

export interface CreateInterestRequest {
  interest: string
  description?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'active' | 'inactive'
}

export interface UpdateInterestRequest {
  interest?: string
  description?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'active' | 'inactive'
}