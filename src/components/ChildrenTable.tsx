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
  Baby,
  Calendar,
  Users
} from "lucide-react"

// Child interface based on typical child profile data
interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  parentId: string;
  parentName?: string;
  parentEmail?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Optional fields
  avatar?: string;
  allergies?: string[];
  medicalNotes?: string;
  emergencyContact?: string;
  grade?: string;
  school?: string;
}

export function ChildrenTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalChildren, setTotalChildren] = useState(0)

  // Mock data for demonstration - replace with actual API call
  const mockChildren: Child[] = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Johnson",
      dateOfBirth: "2018-05-15",
      gender: "female",
      parentId: "parent1",
      parentName: "Sarah Johnson",
      parentEmail: "sarah.johnson@email.com",
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      grade: "Kindergarten",
      school: "Sunshine Elementary"
    },
    {
      id: "2",
      firstName: "Liam",
      lastName: "Smith",
      dateOfBirth: "2017-08-22",
      gender: "male",
      parentId: "parent2",
      parentName: "Michael Smith",
      parentEmail: "michael.smith@email.com",
      isActive: true,
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
      grade: "1st Grade",
      school: "Riverside Elementary",
      allergies: ["Peanuts", "Dairy"]
    },
    {
      id: "3",
      firstName: "Sophia",
      lastName: "Brown",
      dateOfBirth: "2019-03-10",
      gender: "female",
      parentId: "parent3",
      parentName: "Jennifer Brown",
      parentEmail: "jennifer.brown@email.com",
      isActive: false,
      createdAt: "2024-01-25T09:15:00Z",
      updatedAt: "2024-01-25T09:15:00Z",
      grade: "Pre-K",
      school: "Little Stars Academy"
    }
  ]

  // Fetch children from API
  const fetchChildren = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, use mock data
      setChildren(mockChildren)
      setTotalPages(1)
      setTotalChildren(mockChildren.length)
      
      // TODO: Replace with actual API call
      // const response = await getChildrenApi({ page, limit })
      // setChildren(response.data.children)
      // setTotalPages(response.data.pagination?.totalPages || 1)
      // setTotalChildren(response.data.pagination?.totalChildren || response.data.children.length)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch children')
      setChildren([])
    } finally {
      setLoading(false)
    }
  }

  // Load children on component mount
  useEffect(() => {
    fetchChildren(currentPage)
  }, [currentPage])

  // Filter children based on search term
  const filteredChildren = children.filter(child =>
    child.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Helper function to get child display name
  const getChildDisplayName = (child: Child) => {
    return `${child.firstName} ${child.lastName}`
  }

  // Helper function to calculate age
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  // Helper function to get status color
  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Child
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChildren}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.filter(child => child.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently enrolled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
      </div>

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
              <span className="ml-2">Loading children...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchChildren(currentPage)} variant="outline">
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
                    <TableHead>Parent</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChildren.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        {searchTerm ? 'No children found matching your search.' : 'No children found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChildren.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={child.avatar} alt={getChildDisplayName(child)} />
                              <AvatarFallback>
                                {child.firstName[0]}{child.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{getChildDisplayName(child)}</div>
                              <div className="text-sm text-muted-foreground">
                                DOB: {new Date(child.dateOfBirth).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {calculateAge(child.dateOfBirth)} years old
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGenderColor(child.gender)}>
                            {child.gender}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{child.parentName}</div>
                            <div className="text-sm text-muted-foreground">{child.parentEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {child.grade || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(child.isActive)}>
                            {child.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(child.createdAt).toLocaleDateString()}</TableCell>
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
