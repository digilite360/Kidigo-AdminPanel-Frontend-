"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ROUTES } from "@/lib/constants"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (session) {
      router.push(ROUTES.DASHBOARD)
    } else {
      router.push(ROUTES.AUTH.SIGNIN)
    }
  }, [session, status, router])

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Kidigo Admin Panel</h1>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    </div>
  )
}
