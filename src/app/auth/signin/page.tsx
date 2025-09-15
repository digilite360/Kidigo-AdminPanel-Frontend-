"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import { authService } from "@/lib/api/services/auth"
import { ApiError } from "@/types"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiLoading, setApiLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    try {
      console.log('Starting login process for:', email)
      
      // Use NextAuth for authentication and session management
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        console.error('NextAuth signIn error:', result.error)
        setError("Invalid credentials")
        toast.error("Sign In Failed", {
          description: "Invalid email or password. Please try again.",
        })
      } else {
        const session = await getSession()
        console.log('Session created successfully:', session?.user)
        
        if (session?.user) {
          toast.success("Welcome back!", {
            description: `Hello ${session.user.name}! You've been signed in successfully.`,
          })
          router.push("/dashboard")
        }
      }
    } catch (error: any) {
      console.error('Login process error:', error)
      
      let errorMessage = "An unexpected error occurred. Please try again."
      
      if (error instanceof Error) {
        const apiError = error as ApiError
        
        // Handle different types of errors
        if (apiError.status === 401) {
          errorMessage = "Invalid email or password"
        } else if (apiError.status === 422) {
          // Validation errors
          if (apiError.errors) {
            const firstError = Object.values(apiError.errors)[0]?.[0]
            errorMessage = firstError || "Validation failed"
          } else {
            errorMessage = apiError.message || "Invalid input data"
          }
        } else if (apiError.status === 429) {
          errorMessage = "Too many login attempts. Please try again later."
        } else if (apiError.status === 500) {
          errorMessage = "Server error. Please try again later."
        } else if (apiError.status === 0 || !apiError.status) {
          errorMessage = "Network error. Please check your connection."
        } else {
          errorMessage = apiError.message || errorMessage
        }
      }
      
      setError(errorMessage)
      toast.error("Sign In Failed", {
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApiTest = async () => {
    setApiLoading(true)
    try {
      console.log('Testing API integration with login credentials...')
      
      const testCredentials = {
        email: "admin@kidigo.com",
        password: "admin123"
      }
      
      const response = await authService.login(testCredentials)
      
      console.log('API Test Success:', response)
      toast.success("API Test Successful", {
        description: `Login successful: ${response.message}`,
      })
    } catch (error: any) {
      console.error('API Test Failed:', error)
      
      let errorMessage = "API test failed"
      if (error instanceof Error) {
        const apiError = error as ApiError
        errorMessage = apiError.message || error.message
      }
      
      toast.error("API Test Failed", {
        description: errorMessage,
      })
    } finally {
      setApiLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kidigo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          {/* API Test Button for Debug */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleApiTest}
              disabled={apiLoading}
            >
              {apiLoading ? "Testing API..." : "Test API Integration"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Debug: Test the external API with provided credentials
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>Demo credentials:</p>
            <p>Email: admin@kidigo.com</p>
            <p>Password: admin123</p>
            <p className="text-xs text-gray-500 mt-1">
              Use these credentials to test the login functionality
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Want to sell on our platform?
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push(ROUTES.AUTH.VENDOR_REGISTER)}
              >
                Register as a Vendor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
