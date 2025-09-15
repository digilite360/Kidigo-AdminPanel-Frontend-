"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loading } from "@/components/Loading"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  redirectTo = "/auth/signin" 
}: ProtectedRouteProps) => {
  const { loading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin && !isAdmin) {
        router.push("/unauthorized")
        return
      }
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin, redirectTo, router])

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  return <>{children}</>
}
