"use client"

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/contexts/AuthContext"

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </AuthProvider>
    </SessionProvider>
  )
}
