"use client"

import { useState, useEffect, useCallback } from "react"
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
  Loader2,
  Baby,
  Calendar,
  Users,
  X
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { childrenService } from "@/lib/api/services"
import { Child, ChildrenStatistics, ChildrenFilters } from "@/types"
import { useAuth } from "@/contexts/AuthContext"

export function ChildrenTable() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [children, setChildren] = useState<Child[]>([])
  const [statistics, setStatistics] = useState<ChildrenStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalChildren, setTotalChildren] = useState(0)
  const [filters, setFilters] = useState<ChildrenFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [showFilters, setShowFilters] = useState(false)

  // Fetch children from API
  const fetchChildren = useCallback(async (newFilters: ChildrenFilters = filters) => {
    // Only fetch if user is authenticated and is admin
    if (!isAuthenticated || !isAdmin) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await childrenService.getChildren(newFilters)
      
      setChildren(response.data.children)
      setStatistics(response.data.statistics)
      setTotalPages(response.data.pagination.totalPages)
      setTotalChildren(response.data.pagination.totalCount)
      setCurrentPage(response.data.pagination.currentPage)
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch children')
      setChildren([])
      setStatistics(null)
    } finally {
      setLoading(false)
    }
  }, [filters, isAuthenticated, isAdmin])

  // Load children on component mount and when filters change
  useEffect(() => {
    if (!authLoading) {
      fetchChildren()
    }
  }, [fetchChildren, authLoading])

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setFilters(prev => ({
      ...prev,
      search: value,
      page: 1
    }))
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof ChildrenFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
    setSearchTerm("")
  }

  // Helper function to get gender color
  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "male":
        return "bg-blue-100 text-blue-800"
      case "female":
        return "bg-pink-100 text-pink-800"
      case "other":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Helper function to get age group color
  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case "0-5":
        return "bg-green-100 text-green-800"
      case "6-10":
        return "bg-blue-100 text-blue-800"
      case "11-15":
        return "bg-purple-100 text-purple-800"
      case "16-18":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Children</h1>
          <p className="text-muted-foreground">
            Manage children profiles and their information.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Baby className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalChildren}</div>
              <p className="text-xs text-muted-foreground">
                All registered children
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">By Gender</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600">Male</span>
                  <span className="font-medium">{statistics.childrenByGender.male}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-pink-600">Female</span>
                  <span className="font-medium">{statistics.childrenByGender.female}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-600">Other</span>
                  <span className="font-medium">{statistics.childrenByGender.other}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">By Age Group</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">0-5 years</span>
                  <span className="font-medium">{statistics.childrenByAgeGroup['0-5']}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600">6-10 years</span>
                  <span className="font-medium">{statistics.childrenByAgeGroup['6-10']}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-600">11-15 years</span>
                  <span className="font-medium">{statistics.childrenByAgeGroup['11-15']}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-600">16-18 years</span>
                  <span className="font-medium">{statistics.childrenByAgeGroup['16-18']}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.verifiedUsers}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.unverifiedUsers} unverified
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Children</CardTitle>
              <CardDescription>
                A list of all children in your system.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search children..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Advanced Filters */}
        {showFilters && (
          <CardContent className="border-t pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Gender</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {filters.gender ? filters.gender : "All Genders"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleFilterChange('gender', undefined)}>
                      All Genders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('gender', 'male')}>
                      Male
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('gender', 'female')}>
                      Female
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('gender', 'other')}>
                      Other
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Age Group</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {filters.ageGroup ? filters.ageGroup : "All Ages"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleFilterChange('ageGroup', undefined)}>
                      All Ages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('ageGroup', '0-5')}>
                      0-5 years
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('ageGroup', '6-10')}>
                      6-10 years
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('ageGroup', '11-15')}>
                      11-15 years
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('ageGroup', '16-18')}>
                      16-18 years
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {filters.sortBy === 'createdAt' ? 'Created Date' : 
                       filters.sortBy === 'name' ? 'Name' : 
                       filters.sortBy === 'age' ? 'Age' : 'Created Date'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleFilterChange('sortBy', 'createdAt')}>
                      Created Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('sortBy', 'name')}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange('sortBy', 'age')}>
                      Age
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing {children.length} of {totalChildren} children
              </div>
            </div>
          </CardContent>
        )}

        <CardContent>
          {authLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Checking authentication...</span>
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Please sign in to view children data.</p>
            </div>
          ) : !isAdmin ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Admin access required to view children data.</p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading children...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchChildren()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Hobbies</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {children.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        {searchTerm ? 'No children found matching your search.' : 'No children found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    children.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {child.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{child.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {child.age} years old
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGenderColor(child.gender)}>
                            {child.gender}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {child.class}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{child.user.email}</div>
                            <div className="text-sm text-muted-foreground">
                              {child.user.isVerified ? 'Verified' : 'Unverified'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {child.hobbies.slice(0, 2).map((hobby, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {hobby}
                              </Badge>
                            ))}
                            {child.hobbies.length > 2 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="text-xs cursor-help">
                                      +{child.hobbies.length - 2}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="space-y-1">
                                      {child.hobbies.slice(2).map((hobby, index) => (
                                        <div key={index} className="text-sm">{hobby}</div>
                                      ))}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {child.interests.slice(0, 2).map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                            {child.interests.length > 2 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="text-xs cursor-help">
                                      +{child.interests.length - 2}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="space-y-1">
                                      {child.interests.slice(2).map((interest, index) => (
                                        <div key={index} className="text-sm">{interest}</div>
                                      ))}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
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
                                Edit Child
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Child
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
                    Showing {children.length} of {totalChildren} children
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('page', Math.max(1, currentPage - 1))}
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
                      onClick={() => handleFilterChange('page', Math.min(totalPages, currentPage + 1))}
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
