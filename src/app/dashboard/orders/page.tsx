"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock order data
const orders = [
  { id: "1", customer: "John Doe", total: 99.99, status: "completed", date: "2024-01-15" },
  { id: "2", customer: "Jane Smith", total: 149.99, status: "pending", date: "2024-01-20" },
  { id: "3", customer: "Bob Johnson", total: 79.99, status: "shipped", date: "2024-01-25" },
]

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-gray-600">View and manage orders</p>
          </div>
          <Button>Export Orders</Button>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Customer: {order.customer}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Total: ${order.total}</span>
                  <span>Status: {order.status}</span>
                  <span>Date: {order.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
