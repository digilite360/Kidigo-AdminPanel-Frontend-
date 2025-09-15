"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loading } from "@/components/Loading"
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

  if (status === "loading") {
    return <Loading />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Kidigo Admin Panel</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
