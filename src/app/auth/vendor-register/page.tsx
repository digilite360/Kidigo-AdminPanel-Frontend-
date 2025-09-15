"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"

// Validation schema
const vendorRegistrationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  vendorName: z.string().min(2, "Vendor name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessPhone: z.string().min(10, "Please enter a valid phone number"),
  businessAddress: z.object({
    street: z.string().min(5, "Please enter a valid street address"),
    city: z.string().min(2, "Please enter a valid city"),
    state: z.string().min(2, "Please enter a valid state"),
    zipCode: z.string().min(3, "Please enter a valid ZIP code"),
    country: z.string().min(2, "Please enter a valid country"),
  }),
})

type VendorRegistrationFormData = z.infer<typeof vendorRegistrationSchema>

export default function VendorRegisterPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(vendorRegistrationSchema),
  })

  const onSubmit = async (data: VendorRegistrationFormData) => {
    setLoading(true)

    try {
      const response = await fetch("/api/vendors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Registration failed")
      }

      toast.success("Registration Successful!", {
        description: "Your vendor account has been created successfully. You can now sign in with your credentials.",
      })
      
      setSuccess(true)
      setTimeout(() => {
        router.push(ROUTES.AUTH.SIGNIN)
      }, 2000)
    } catch (err) {
      toast.error("Registration Failed", {
        description: err instanceof Error ? err.message : "An error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your vendor account has been created successfully. You can now sign in with your credentials.
              </p>
              <p className="text-xs text-gray-500">Redirecting to sign in page...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Register as a Vendor</CardTitle>
          <CardDescription className="text-center">
            Create your vendor account to start selling on our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">
                    Vendor Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="vendorName"
                    type="text"
                    {...register("vendorName")}
                    placeholder="John Doe"
                    className={errors.vendorName ? "border-red-500" : ""}
                  />
                  {errors.vendorName && (
                    <p className="text-red-500 text-sm">{errors.vendorName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="vendor@business.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter a secure password"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    {...register("businessName")}
                    placeholder="ABC Toys Store"
                    className={errors.businessName ? "border-red-500" : ""}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm">{errors.businessName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">
                    Business Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    {...register("businessPhone")}
                    placeholder="+1234567890"
                    className={errors.businessPhone ? "border-red-500" : ""}
                  />
                  {errors.businessPhone && (
                    <p className="text-red-500 text-sm">{errors.businessPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Business Address</h3>
              <div className="space-y-2">
                <Label htmlFor="street">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="street"
                  type="text"
                  {...register("businessAddress.street")}
                  placeholder="123 Main St"
                  className={errors.businessAddress?.street ? "border-red-500" : ""}
                />
                {errors.businessAddress?.street && (
                  <p className="text-red-500 text-sm">{errors.businessAddress.street.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    {...register("businessAddress.city")}
                    placeholder="New York"
                    className={errors.businessAddress?.city ? "border-red-500" : ""}
                  />
                  {errors.businessAddress?.city && (
                    <p className="text-red-500 text-sm">{errors.businessAddress.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    {...register("businessAddress.state")}
                    placeholder="NY"
                    className={errors.businessAddress?.state ? "border-red-500" : ""}
                  />
                  {errors.businessAddress?.state && (
                    <p className="text-red-500 text-sm">{errors.businessAddress.state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">
                    ZIP Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    {...register("businessAddress.zipCode")}
                    placeholder="10001"
                    className={errors.businessAddress?.zipCode ? "border-red-500" : ""}
                  />
                  {errors.businessAddress?.zipCode && (
                    <p className="text-red-500 text-sm">{errors.businessAddress.zipCode.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  type="text"
                  {...register("businessAddress.country")}
                  placeholder="USA"
                  className={errors.businessAddress?.country ? "border-red-500" : ""}
                />
                {errors.businessAddress?.country && (
                  <p className="text-red-500 text-sm">{errors.businessAddress.country.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Creating Account..." : "Register as Vendor"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push(ROUTES.AUTH.SIGNIN)}
              >
                Back to Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
