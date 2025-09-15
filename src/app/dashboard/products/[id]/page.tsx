"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

// Mock product data
const products = [
  { 
    id: "1", 
    name: "Product A", 
    price: 29.99, 
    category: "Electronics", 
    stock: 50,
    description: "High-quality electronic product with advanced features.",
    createdAt: "2024-01-15"
  },
  { 
    id: "2", 
    name: "Product B", 
    price: 19.99, 
    category: "Clothing", 
    stock: 25,
    description: "Comfortable and stylish clothing item.",
    createdAt: "2024-01-20"
  },
  { 
    id: "3", 
    name: "Product C", 
    price: 39.99, 
    category: "Books", 
    stock: 100,
    description: "Educational and informative book.",
    createdAt: "2024-01-25"
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Not Found</CardTitle>
              <CardDescription>The product you&apos;re looking for doesn&apos;t exist.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">Product Details</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>Back</Button>
            <Button>Edit Product</Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg">{product.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-lg">{product.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Price</label>
                <p className="text-lg">${product.price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-lg">{product.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Stock</label>
                <p className="text-lg">{product.stock} units</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="text-lg">{product.createdAt}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Product performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No sales data available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
