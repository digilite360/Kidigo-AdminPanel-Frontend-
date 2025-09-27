"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Plus,
  Download,
  Heart,
  X,
  Loader2
} from "lucide-react"
import { interestService } from "@/lib/api/services/interests"
import { Interest, InterestFilters, CreateInterestRequest, UpdateInterestRequest } from "@/types"

export function InterestsTable() {
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedInterest, setSelectedInterest] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: ""
  })


  // Fetch interests from API
  const fetchInterests = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const filters: InterestFilters = {
        page: 1,
        limit: 50,
        search: searchTerm || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }

      const response = await interestService.getInterests(filters)
      
      if (response.status === 'success' && response.data) {
        setInterests(response.data.interests)
      } else {
        throw new Error(response.message || 'Failed to fetch interests')
      }
    } catch (err: any) {
      console.error('Error fetching interests:', err)
      setError(err.message || 'Failed to fetch interests')
      setInterests([])
    } finally {
      setLoading(false)
    }
  }

  // Load interests on component mount
  useEffect(() => {
    fetchInterests()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchInterests()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // No need for client-side filtering since API handles it
  const filteredInterests = interests


  const handleCreate = async () => {
    try {
      const createData: CreateInterestRequest = {
        interest: formData.name
      }

      const response = await interestService.createInterest(createData)
      
      if (response.status === 'success') {
        setIsCreateModalOpen(false)
        resetForm()
        fetchInterests() // Refresh the list
      } else {
        throw new Error(response.message || 'Failed to create interest')
      }
    } catch (err: any) {
      console.error('Error creating interest:', err)
      setError(err.message || 'Failed to create interest')
    }
  }

  const handleEdit = async () => {
    try {
      const updateData: UpdateInterestRequest = {
        interest: formData.name
      }

      const response = await interestService.updateInterest(selectedInterest.id, updateData)
      
      if (response.status === 'success') {
        setIsEditModalOpen(false)
        resetForm()
        fetchInterests() // Refresh the list
      } else {
        throw new Error(response.message || 'Failed to update interest')
      }
    } catch (err: any) {
      console.error('Error updating interest:', err)
      setError(err.message || 'Failed to update interest')
    }
  }

  const handleDelete = async () => {
    try {
      const response = await interestService.deleteInterest(selectedInterest.id)
      
      if (response.status === 'success') {
        setIsDeleteModalOpen(false)
        fetchInterests() // Refresh the list
      } else {
        throw new Error(response.message || 'Failed to delete interest')
      }
    } catch (err: any) {
      console.error('Error deleting interest:', err)
      setError(err.message || 'Failed to delete interest')
    }
  }

  const resetForm = () => {
    setFormData({
      name: ""
    })
    setSelectedInterest(null)
  }

  const openEditModal = (interest: Interest) => {
    setSelectedInterest(interest)
    setFormData({
      name: interest.interest
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (interest: Interest) => {
    setSelectedInterest(interest)
    setIsDeleteModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interests</h1>
          <p className="text-muted-foreground">
            Manage interest categories and preferences.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Interest
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="space-y-3">
                <DialogTitle>Add New Interest</DialogTitle>
                <DialogDescription>
                  Create a new interest category for users to select from.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Interest Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter interest name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>Create Interest</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Interests</CardTitle>
              <CardDescription>
                A list of all interest categories and their details.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading interests...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchInterests} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interest</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      {searchTerm ? 'No interests found matching your search.' : 'No interests found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInterests.map((interest) => (
                    <TableRow key={interest.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{interest.interest}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(interest.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(interest.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditModal(interest)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Interest
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => openDeleteModal(interest)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Interest
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader className="space-y-3">
            <DialogTitle>Edit Interest</DialogTitle>
            <DialogDescription>
              Update the interest details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Interest Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter interest name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Interest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Interest</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedInterest?.interest}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
