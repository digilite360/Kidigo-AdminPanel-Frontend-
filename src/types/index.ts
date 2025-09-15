import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string
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
  _id?: string
  email: string
  password: string
  vendorName: string
  businessName: string
  businessPhone: string
  role: string
  businessAddress: BusinessAddress
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