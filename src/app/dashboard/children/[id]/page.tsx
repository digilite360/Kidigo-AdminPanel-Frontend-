"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { Baby, Calendar, Users, Phone, Mail, MapPin, AlertTriangle } from "lucide-react"

// Mock child data
const children = [
  { 
    id: "1", 
    firstName: "Emma", 
    lastName: "Johnson", 
    dateOfBirth: "2018-05-15",
    gender: "female",
    parentId: "parent1",
    parentName: "Sarah Johnson", 
    parentEmail: "sarah.johnson@email.com",
    parentPhone: "+1 (555) 123-4567",
    isActive: true, 
    createdAt: "2024-01-15T10:00:00Z",
    grade: "Kindergarten",
    school: "Sunshine Elementary",
    allergies: ["None"],
    medicalNotes: "No known medical conditions",
    emergencyContact: "Michael Johnson - +1 (555) 987-6543",
    address: "123 Main St, Anytown, ST 12345"
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
    parentPhone: "+1 (555) 234-5678",
    isActive: true, 
    createdAt: "2024-01-20T14:30:00Z",
    grade: "1st Grade",
    school: "Riverside Elementary",
    allergies: ["Peanuts", "Dairy"],
    medicalNotes: "Mild asthma - inhaler available",
    emergencyContact: "Lisa Smith - +1 (555) 876-5432",
    address: "456 Oak Ave, Somewhere, ST 67890"
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
    parentPhone: "+1 (555) 345-6789",
    isActive: false, 
    createdAt: "2024-01-25T09:15:00Z",
    grade: "Pre-K",
    school: "Little Stars Academy",
    allergies: ["None"],
    medicalNotes: "No known medical conditions",
    emergencyContact: "David Brown - +1 (555) 765-4321",
    address: "789 Pine St, Elsewhere, ST 54321"
  }
]

export default function ChildDetailPage() {
  const params = useParams()
  const router = useRouter()
  const childId = params.id as string

  const child = children.find(c => c.id === childId)

  if (!child) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle>Child Not Found</CardTitle>
              <CardDescription>The child you&apos;re looking for doesn&apos;t exist.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    )
  }

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

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

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
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {child.firstName[0]}{child.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{child.firstName} {child.lastName}</h1>
              <p className="text-gray-600">Child Profile</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>Back</Button>
            <Button>Edit Child</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg">{child.firstName} {child.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <p className="text-lg">{calculateAge(child.dateOfBirth)} years old</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-lg">{new Date(child.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <div className="mt-1">
                    <Badge className={getGenderColor(child.gender)}>
                      {child.gender}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(child.isActive)}>
                      {child.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-lg">{new Date(child.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Education Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Grade</label>
                  <p className="text-lg">{child.grade || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">School</label>
                  <p className="text-lg">{child.school || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Parent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Name</label>
                  <p className="text-lg">{child.parentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{child.parentEmail}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{child.parentPhone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-lg">{child.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Allergies</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {child.allergies && child.allergies.length > 0 ? (
                      child.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-lg text-gray-500">None</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="text-lg">{child.emergencyContact}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Medical Notes</label>
                <p className="text-lg mt-1">{child.medicalNotes}</p>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Recent child activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No recent activity to display.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
