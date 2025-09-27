"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { 
  Store, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  CreditCard,
  TrendingUp,
  Package,
  Calendar
} from "lucide-react"

// Mock vendor data
const vendors = [
  {
    id: "1",
    businessName: "Little Learners Toys",
    contactName: "Sarah Johnson",
    email: "sarah@littlelearnerstoys.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    businessType: "Educational Toys",
    status: "active",
    isVerified: true,
    rating: 4.8,
    totalProducts: 45,
    totalOrders: 234,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    website: "https://littlelearnerstoys.com",
    description: "Specializing in educational toys for children ages 2-12. We provide high-quality, safe, and engaging toys that promote learning and development.",
    licenseNumber: "LLT-2024-001",
    taxId: "12-3456789",
    bankAccount: "****1234",
    monthlyRevenue: 15420,
    lastLogin: "2024-01-30T14:30:00Z"
  },
  {
    id: "2",
    businessName: "Creative Kids Crafts",
    contactName: "Michael Smith",
    email: "michael@creativekidscrafts.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue",
    city: "Somewhere",
    state: "NY",
    zipCode: "67890",
    businessType: "Arts & Crafts",
    status: "active",
    isVerified: true,
    rating: 4.6,
    totalProducts: 32,
    totalOrders: 189,
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    website: "https://creativekidscrafts.com",
    description: "Premium arts and crafts supplies for creative children. Our products inspire creativity and artistic expression.",
    licenseNumber: "CKC-2024-002",
    taxId: "98-7654321",
    bankAccount: "****5678",
    monthlyRevenue: 12850,
    lastLogin: "2024-01-29T09:15:00Z"
  },
  {
    id: "3",
    businessName: "Healthy Kids Nutrition",
    contactName: "Jennifer Brown",
    email: "jennifer@healthykidsnutrition.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Street",
    city: "Elsewhere",
    state: "TX",
    zipCode: "54321",
    businessType: "Health & Nutrition",
    status: "pending",
    isVerified: false,
    rating: 0,
    totalProducts: 0,
    totalOrders: 0,
    createdAt: "2024-01-25T09:15:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
    description: "Organic and healthy food products for children. Promoting healthy eating habits from an early age.",
    licenseNumber: "HKN-2024-003",
    taxId: "45-6789012",
    bankAccount: "****9012",
    monthlyRevenue: 0,
    lastLogin: "2024-01-25T09:15:00Z"
  }
]

export default function VendorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string

  const vendor = vendors.find(v => v.id === vendorId)

  if (!vendor) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Not Found</CardTitle>
              <CardDescription>The vendor you&apos;re looking for doesn&apos;t exist.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Unverified</Badge>
    )
  }

  const renderRating = (rating: number) => {
    if (rating === 0) return <span className="text-gray-400">No rating</span>
    
    return (
      <div className="flex items-center gap-1">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="text-lg font-medium">{rating}</span>
        <span className="text-sm text-gray-500">/ 5.0</span>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {vendor.businessName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{vendor.businessName}</h1>
              <p className="text-gray-600">Vendor Profile</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>Back</Button>
            <Button>Edit Vendor</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="text-lg">{vendor.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Type</label>
                  <p className="text-lg">{vendor.businessType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="text-lg">{vendor.contactName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verification</label>
                  <div className="mt-1">
                    {getVerificationBadge(vendor.isVerified)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Rating</label>
                  <div className="mt-1">
                    {renderRating(vendor.rating)}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-lg mt-1">{vendor.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{vendor.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{vendor.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                      {vendor.website}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">
                      {vendor.address}, {vendor.city}, {vendor.state} {vendor.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vendor.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Active products
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vendor.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  All time orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${vendor.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Current month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Business Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Business Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">License Number</label>
                  <p className="text-lg">{vendor.licenseNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tax ID</label>
                  <p className="text-lg">{vendor.taxId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bank Account</label>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{vendor.bankAccount}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Login</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{new Date(vendor.lastLogin).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Account Timeline
              </CardTitle>
              <CardDescription>Important dates and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Account Created</p>
                    <p className="text-sm text-gray-500">{new Date(vendor.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-sm text-gray-500">{new Date(vendor.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-gray-500">{new Date(vendor.lastLogin).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
