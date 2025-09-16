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
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown
} from "lucide-react"
import { vendorService } from "@/lib/api/services/vendors"
import { Vendor, VendorFilters, VendorPagination } from "@/types"

// Statistics interface for vendor stats
interface VendorStats {
  totalVendors: number
  activeVendors: number
  pendingVendors: number
  verifiedVendors: number
  approvedVendors: number
}

export function VendorsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalVendors, setTotalVendors] = useState(0)
  const [pagination, setPagination] = useState<VendorPagination | null>(null)
  const [stats, setStats] = useState<VendorStats | null>(null)
  const [filters, setFilters] = useState<VendorFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Fetch vendors from API
  const fetchVendors = async (currentFilters: VendorFilters = filters) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await vendorService.getVendors(currentFilters)
      
      if (response.status === 'success') {
        setVendors(response.data.vendors)
        setPagination(response.data.pagination)
        setTotalPages(response.data.pagination.totalPages)
        setTotalVendors(response.data.pagination.totalCount)
      } else {
        throw new Error(response.message || 'Failed to fetch vendors')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch vendors')
      setVendors([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }

  // Fetch vendor statistics
  const fetchVendorStats = async () => {
    try {
      const response = await vendorService.getVendorStatistics()
      if (response.status === 'success') {
        setStats({
          totalVendors: response.data.totalVendors,
          activeVendors: response.data.activeVendors,
          pendingVendors: response.data.pendingVendors,
          verifiedVendors: response.data.verifiedVendors,
          approvedVendors: response.data.approvedVendors
        })
      }
    } catch (err) {
      console.error('Failed to fetch vendor statistics:', err)
    }
  }

  // Load vendors and stats on component mount
  useEffect(() => {
    fetchVendors()
    fetchVendorStats()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        const newFilters = { ...filters, search: searchTerm, page: 1 }
        setFilters(newFilters)
        fetchVendors(newFilters)
      } else {
        const newFilters = { ...filters, search: undefined, page: 1 }
        setFilters(newFilters)
        fetchVendors(newFilters)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    setCurrentPage(page)
    fetchVendors(newFilters)
  }

  // Helper function to get status badge
  const getStatusBadge = (vendor: Vendor) => {
    if (vendor.isActive && vendor.isApproved) {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    } else if (!vendor.isApproved) {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    } else if (!vendor.isActive) {
      return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }

  // Helper function to get verification badge
  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Verified
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Unverified
      </Badge>
    )
  }

  // Helper function to get approval badge
  const getApprovalBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Approved
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
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
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVendors || totalVendors}</div>
            <p className="text-xs text-muted-foreground">
              All registered vendors
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
              {stats?.activeVendors || vendors.filter(vendor => vendor.isActive).length}
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
              {stats?.pendingVendors || vendors.filter(vendor => !vendor.isApproved).length}
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
              {stats?.verifiedVendors || vendors.filter(vendor => vendor.isVerified).length}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, isVerified: true, page: 1 }
                      setFilters(newFilters)
                      fetchVendors(newFilters)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Show Verified Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, isApproved: false, page: 1 }
                      setFilters(newFilters)
                      fetchVendors(newFilters)
                    }}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Show Pending Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, isActive: true, page: 1 }
                      setFilters(newFilters)
                      fetchVendors(newFilters)
                    }}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Show Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
                      setFilters(newFilters)
                      fetchVendors(newFilters)
                    }}
                  >
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        {searchTerm ? 'No vendors found matching your search.' : 'No vendors found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {vendor.businessName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{vendor.businessName}</div>
                              <div className="text-sm text-muted-foreground">
                                {vendor.vendorName}
                              </div>
                            </div>
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
                              {vendor.businessPhone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {vendor.businessAddress.city}, {vendor.businessAddress.state}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {vendor.businessAddress.country}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(vendor)}
                        </TableCell>
                        <TableCell>
                          {getVerificationBadge(vendor.isVerified)}
                        </TableCell>
                        <TableCell>
                          {getApprovalBadge(vendor.isApproved)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(vendor.createdAt).toLocaleDateString()}
                          </div>
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
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {vendors.length} of {pagination.totalCount} vendors
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
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
