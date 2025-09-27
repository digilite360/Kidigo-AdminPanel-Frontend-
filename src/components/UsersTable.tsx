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
  CheckCircle,
  XCircle,
  Users,
  UserCheck,
  UserX,
  Shield
} from "lucide-react"
import { userService } from "@/lib/api/services/users"
import { User, UserFilters, UserPagination } from "@/types"

// Statistics interface for user stats
interface UserStats {
  totalUsers: number
  verifiedUsers: number
  unverifiedUsers: number
  adminUsers: number
  regularUsers: number
}

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [pagination, setPagination] = useState<UserPagination | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Fetch users from API
  const fetchUsers = async (currentFilters: UserFilters = filters) => {
    try {
      setLoading(true)
      setError(null)
      
      // Clean up filters to avoid sending undefined values
      const cleanFilters = Object.fromEntries(
        Object.entries(currentFilters).filter(([_, value]) => value !== undefined && value !== null)
      )
      
      const response = await userService.getUsers(cleanFilters)
      
      if (response.status === 'success') {
        setUsers(response.data.users)
        setPagination(response.data.pagination)
        setTotalPages(response.data.pagination.totalPages)
        setTotalUsers(response.data.pagination.totalUsers)
        
        // Calculate stats from the users data
        calculateUserStats(response.data.users)
      } else {
        throw new Error(response.message || 'Failed to fetch users')
      }
    } catch (err: any) {
      console.error('Error fetching users:', err)
      setError(err.message || 'Failed to fetch users')
      setUsers([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }

  // Calculate user statistics from the users data
  const calculateUserStats = (usersData: User[]) => {
    const totalUsers = usersData.length
    const verifiedUsers = usersData.filter(user => user.isVerified).length
    const unverifiedUsers = usersData.filter(user => !user.isVerified).length
    const adminUsers = usersData.filter(user => user.role === 'admin').length
    const regularUsers = usersData.filter(user => user.role === 'user').length

    setStats({
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
      adminUsers,
      regularUsers
    })
  }

  // Load users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        const newFilters = { ...filters, search: searchTerm, page: 1 }
        setFilters(newFilters)
        fetchUsers(newFilters)
      } else {
        const newFilters = { ...filters, search: undefined, page: 1 }
        setFilters(newFilters)
        fetchUsers(newFilters)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    setCurrentPage(page)
    fetchUsers(newFilters)
  }

  // Helper function to get user display name
  const getUserDisplayName = (user: User) => {
    if (user.name) return user.name;
    // Extract name from email if no name is provided
    const emailName = user.email.split('@')[0];
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }

  // Helper function to get user status
  const getUserStatus = (user: User) => {
    if (user.status) return user.status;
    return user.isVerified ? 'verified' : 'unverified';
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "unverified":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their permissions.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers || stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.verifiedUsers || users.filter(user => user.isVerified).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Email verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unverified Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.unverifiedUsers || users.filter(user => !user.isVerified).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.adminUsers || users.filter(user => user.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Admin privileges
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                A list of all users in your system.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                      const newFilters = { ...filters, role: 'admin', page: 1 }
                      setFilters(newFilters)
                      fetchUsers(newFilters)
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Show Admins Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, role: 'user', page: 1 }
                      setFilters(newFilters)
                      fetchUsers(newFilters)
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Show Regular Users Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, isVerified: true, page: 1 }
                      setFilters(newFilters)
                      fetchUsers(newFilters)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Show Verified Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { ...filters, isVerified: false, page: 1 }
                      setFilters(newFilters)
                      fetchUsers(newFilters)
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Show Unverified Only
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      const newFilters = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }
                      setFilters(newFilters)
                      fetchUsers(newFilters)
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
              <span className="ml-2">Loading users...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => fetchUsers(currentPage)} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={getUserDisplayName(user)} />
                              <AvatarFallback>
                                {getUserDisplayName(user).split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{getUserDisplayName(user)}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(getUserStatus(user))}>
                            {getUserStatus(user)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
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
                    Showing {users.length} of {pagination.totalUsers} users
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
