"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Plus,
  Download,
  Loader2,
  Store,
  Star,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

// Vendor interface based on typical vendor profile data
interface Vendor {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  businessType: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  isVerified: boolean;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
  // Optional fields
  avatar?: string;
  website?: string;
  description?: string;
  licenseNumber?: string;
  taxId?: string;
  bankAccount?: string;
}

export function VendorsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalVendors, setTotalVendors] = useState(0)

  // Mock data for demonstration - replace with actual API call
  const mockVendors: Vendor[] = [
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
      description: "Specializing in educational toys for children ages 2-12",
      licenseNumber: "LLT-2024-001",
      taxId: "12-3456789"
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
      description: "Premium arts and crafts supplies for creative children",
      licenseNumber: "CKC-2024-002",
      taxId: "98-7654321"
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
      description: "Organic and healthy food products for children",
      licenseNumber: "HKN-2024-003",
      taxId: "45-6789012"
    },
    {
      id: "4",
      businessName: "Sports Kids Equipment",
      contactName: "David Wilson",
      email: "david@sportskidsequipment.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Street",
      city: "Nowhere",
      state: "FL",
      zipCode: "98765",
      businessType: "Sports Equipment",
      status: "suspended",
      isVerified: true,
      rating: 3.2,
      totalProducts: 28,
      totalOrders: 156,
      createdAt: "2024-01-10T16:45:00Z",
      updatedAt: "2024-01-30T11:20:00Z",
      website: "https://sportskidsequipment.com",
      description: "Quality sports equipment for young athletes",
      licenseNumber: "SKE-2024-004",
      taxId: "78-9012345"
    }
  ]

  // Fetch vendors from API
  const fetchVendors = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, use mock data
      setVendors(mockVendors)
      setTotalPages(1)
      setTotalVendors(mockVendors.length)
      
      // TODO: Replace with actual API call
      // const response = await getVendorsApi({ page, limit })
      // setVendors(response.data.vendors)
      // setTotalPages(response.data.pagination?.totalPages || 1)
      // setTotalVendors(response.data.pagination?.totalVendors || response.data.vendors.length)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vendors')
      setVendors([])
    } finally {
      setLoading(false)
    }
  }

  // Load vendors on component mount
  useEffect(() => {
    fetchVendors(currentPage)
  }, [currentPage])

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor =>
    vendor.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.businessType?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Helper function to get status color
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

  // Helper function to get verification badge
  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Unverified</Badge>
    )
  }

  // Helper function to render rating stars
  const renderRating = (rating: number) => {
    if (rating === 0) return <span className="text-gray-400">No rating</span>
    
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">
            Manage vendor accounts and their business information.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVendors}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(vendor => vendor.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(vendor => vendor.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter(vendor => vendor.isVerified).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Fully verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Vendors</CardTitle>
              <CardDescription>
                A list of all vendors in your system.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading vendors...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchVendors(currentPage)} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        {searchTerm ? 'No vendors found matching your search.' : 'No vendors found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={vendor.avatar} alt={vendor.businessName} />
                              <AvatarFallback>
                                {vendor.businessName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{vendor.businessName}</div>
                              <div className="text-sm text-muted-foreground">
                                {vendor.contactName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {vendor.businessType}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {vendor.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {vendor.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {renderRating(vendor.rating)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {vendor.totalProducts} products
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vendor.status)}>
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getVerificationBadge(vendor.isVerified)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Vendor
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Store className="mr-2 h-4 w-4" />
                                View Products
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Vendor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {vendors.length} of {totalVendors} vendors
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
