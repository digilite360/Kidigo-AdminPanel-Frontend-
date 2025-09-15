"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock product data
const products = [
  { id: "1", name: "Product A", price: 29.99, category: "Electronics", stock: 50 },
  { id: "2", name: "Product B", price: 19.99, category: "Clothing", stock: 25 },
  { id: "3", name: "Product C", price: 39.99, category: "Books", stock: 100 },
]

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-600">Manage product catalog</p>
          </div>
          <Button>Add New Product</Button>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>Category: {product.category}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Price: ${product.price}</span>
                  <span>Stock: {product.stock}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
