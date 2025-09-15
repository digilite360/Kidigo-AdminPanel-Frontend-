"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Store
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

// Mock data for admin - replace with real data from your API
const adminMetrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    description: "from last month"
  },
  {
    title: "New Customers",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    description: "from last month"
  },
  {
    title: "Active Products",
    value: "12,234",
    change: "+19%",
    trend: "up",
    description: "from last month"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    description: "from last month"
  }
]

// Mock data for vendors - replace with real data from your API
const vendorMetrics = [
  {
    title: "My Revenue",
    value: "$2,450.00",
    change: "+15.2%",
    trend: "up",
    description: "from last month"
  },
  {
    title: "Total Orders",
    value: "45",
    change: "+8.1%",
    trend: "up",
    description: "from last month"
  },
  {
    title: "My Products",
    value: "12",
    change: "+2",
    trend: "up",
    description: "new products added"
  },
  {
    title: "Order Rate",
    value: "2.8%",
    change: "+0.3%",
    trend: "up",
    description: "from last month"
  }
]

// Admin orders data
const adminOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Premium Package",
    amount: "$299.00",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Basic Package",
    amount: "$99.00",
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    product: "Enterprise Package",
    amount: "$599.00",
    status: "processing",
    date: "2024-01-13"
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    product: "Premium Package",
    amount: "$299.00",
    status: "completed",
    date: "2024-01-12"
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    product: "Basic Package",
    amount: "$99.00",
    status: "cancelled",
    date: "2024-01-11"
  }
]

// Vendor orders data
const vendorOrders = [
  {
    id: "V-ORD-001",
    customer: "Sarah Johnson",
    product: "Educational Toys Set",
    amount: "$89.99",
    status: "completed",
    date: "2024-01-15"
  },
  {
    id: "V-ORD-002",
    customer: "Mike Davis",
    product: "Building Blocks",
    amount: "$45.50",
    status: "pending",
    date: "2024-01-14"
  },
  {
    id: "V-ORD-003",
    customer: "Lisa Wilson",
    product: "Art Supplies Kit",
    amount: "$32.99",
    status: "processing",
    date: "2024-01-13"
  },
  {
    id: "V-ORD-004",
    customer: "Tom Brown",
    product: "Educational Toys Set",
    amount: "$89.99",
    status: "completed",
    date: "2024-01-12"
  }
]

// Admin products data
const adminProducts = [
  { name: "Premium Package", sales: 234, revenue: "$70,200" },
  { name: "Basic Package", sales: 189, revenue: "$18,900" },
  { name: "Enterprise Package", sales: 156, revenue: "$93,600" },
  { name: "Starter Package", sales: 98, revenue: "$9,800" }
]

// Vendor products data
const vendorProducts = [
  { name: "Educational Toys Set", sales: 12, revenue: "$1,079.88" },
  { name: "Building Blocks", sales: 8, revenue: "$364.00" },
  { name: "Art Supplies Kit", sales: 15, revenue: "$494.85" },
  { name: "Science Kit", sales: 6, revenue: "$299.94" }
]

export function DashboardOverview() {
  const { user, isVendor } = useAuth()
  
  // Select data based on user role
  const metrics = isVendor ? vendorMetrics : adminMetrics
  const recentOrders = isVendor ? vendorOrders : adminOrders
  const topProducts = isVendor ? vendorProducts : adminProducts

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isVendor ? "Vendor Dashboard" : "Admin Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {isVendor 
              ? `Welcome back, ${user?.name}! Here's your vendor performance overview.`
              : "Welcome back! Here's what's happening with your business today."
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isVendor ? (
            <>
              <Button variant="outline">
                <Store className="mr-2 h-4 w-4" />
                My Store
              </Button>
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">Export</Button>
              <Button>Add Product</Button>
            </>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>{" "}
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{isVendor ? "My Sales Overview" : "Revenue Overview"}</CardTitle>
            <CardDescription>
              {isVendor 
                ? "Your sales performance for the last 6 months"
                : "Your revenue for the last 6 months"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>{isVendor ? "Sales chart will be displayed here" : "Revenue chart will be displayed here"}</p>
                <p className="text-sm">Connect your analytics to see data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{isVendor ? "My Top Products" : "Top Products"}</CardTitle>
            <CardDescription>
              {isVendor 
                ? "Your best performing products this month"
                : "Best performing products this month"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                    <Progress 
                      value={(product.sales / 234) * 100} 
                      className="w-16 h-2 mt-1" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{isVendor ? "My Recent Orders" : "Recent Orders"}</CardTitle>
          <CardDescription>
            {isVendor 
              ? "A list of your recent customer orders and their status."
              : "A list of your recent orders and their status."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
