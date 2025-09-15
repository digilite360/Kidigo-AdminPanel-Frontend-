"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock user data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "user", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive" },
]

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-600">Manage user accounts</p>
          </div>
          <Button>Add New User</Button>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/users/${user.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Role: {user.role}</span>
                  <span>Status: {user.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
