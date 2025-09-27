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
  Store,
  Users,
  Baby,
  UserCheck,
  UserX
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { getChildrenStatisticsApi } from "@/api/apiCall/children"
import { useEffect, useState } from "react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Interface for children statistics
interface ChildrenStatistics {
  totalChildren: number;
  totalUsers: {
    total: number;
    verified: number;
    unverified: number;
  };
  childrenByGender: {
    male: number;
    female: number;
    other: number;
  };
  childrenByAgeGroup: {
    "0-5": number;
    "6-10": number;
    "11-15": number;
    "16-18": number;
  };
  childrenByClass: Record<string, number>;
  recentRegistrations: {
    users: number;
    children: number;
  };
}

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
  const { user, isVendor, isAuthenticated } = useAuth()
  const [childrenStats, setChildrenStats] = useState<ChildrenStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch children statistics for admin users
  useEffect(() => {
    const fetchChildrenStatistics = async () => {
      // Only fetch if user is authenticated and not a vendor
      if (isAuthenticated && !isVendor) {
        try {
          setLoading(true)
          console.log('Fetching children statistics...')
          console.log('User authenticated:', isAuthenticated)
          console.log('User role:', user?.role)
          const response = await getChildrenStatisticsApi()
          console.log('Children statistics response:', response)
          if (response.status === 'success') {
            setChildrenStats(response.data)
          } else {
            setError('Failed to fetch children statistics')
          }
        } catch (err) {
          console.error('Error fetching children statistics:', err)
          setError('Failed to fetch children statistics')
        } finally {
          setLoading(false)
        }
      } else {
        console.log('Skipping children statistics fetch - not authenticated or is vendor')
        setLoading(false)
      }
    }

    // Add a small delay to ensure session is properly loaded
    const timer = setTimeout(() => {
      fetchChildrenStatistics()
    }, 100)

    return () => clearTimeout(timer)
  }, [isVendor, isAuthenticated, user])

  // Generate admin metrics from children statistics
  const getAdminMetrics = () => {
    if (!childrenStats) return []
    
    return [
      {
        title: "Total Children",
        value: childrenStats.totalChildren.toString(),
        change: `+${childrenStats.recentRegistrations.children}`,
        trend: "up" as const,
        description: "recently registered",
        icon: Baby
      },
      {
        title: "Total Users",
        value: childrenStats.totalUsers.total.toString(),
        change: `+${childrenStats.recentRegistrations.users}`,
        trend: "up" as const,
        description: "recently registered",
        icon: Users
      },
      {
        title: "Verified Users",
        value: childrenStats.totalUsers.verified.toString(),
        change: `${Math.round((childrenStats.totalUsers.verified / childrenStats.totalUsers.total) * 100)}%`,
        trend: "up" as const,
        description: "verification rate",
        icon: UserCheck
      },
      {
        title: "Unverified Users",
        value: childrenStats.totalUsers.unverified.toString(),
        change: `${Math.round((childrenStats.totalUsers.unverified / childrenStats.totalUsers.total) * 100)}%`,
        trend: childrenStats.totalUsers.unverified > 0 ? "down" as const : "up" as const,
        description: "need verification",
        icon: UserX
      }
    ]
  }
  
  // Select data based on user role
  const metrics = isVendor ? vendorMetrics : (loading ? [] : getAdminMetrics())
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
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading && !isVendor ? (
          // Loading skeleton for admin metrics
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))
        ) : error && !isVendor ? (
          // Error state for admin metrics
          <Card className="col-span-4">
            <CardContent className="pt-6">
              <div className="text-center text-red-600">
                <p>Failed to load children statistics</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Actual metrics
          metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <div className="flex items-center space-x-1">
                  {metric.icon && <metric.icon className="h-4 w-4 text-blue-600" />}
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
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
          ))
        )}
      </div>

      {/* Additional Children Statistics for Admin */}
      {!isVendor && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Children by Gender - Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Children by Gender</CardTitle>
              <CardDescription>Distribution of children by gender</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                // Skeleton for pie chart
                <div className="h-[250px] flex items-center justify-center">
                  <div className="relative">
                    {/* Outer circle skeleton */}
                    <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse"></div>
                    {/* Inner circle skeleton */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white"></div>
                    {/* Loading text */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500">
                      Loading...
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="h-[250px] flex items-center justify-center text-red-600">
                  <div className="text-center">
                    <p>Failed to load chart data</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : childrenStats ? (
                <ChartContainer
                  config={{
                    male: {
                      label: "Male",
                      color: "#3b82f6", // Blue
                    },
                    female: {
                      label: "Female", 
                      color: "#ec4899", // Pink
                    },
                  }}
                  className="h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip />
                    <Pie
                      data={[
                        { name: "Male", value: childrenStats.childrenByGender.male, fill: "var(--color-male)" },
                        { name: "Female", value: childrenStats.childrenByGender.female, fill: "var(--color-female)" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell key="cell-male" fill="var(--color-male)" />
                      <Cell key="cell-female" fill="var(--color-female)" />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              ) : null}
            </CardContent>
          </Card>

          {/* Children by Age Group - Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Children by Age Group</CardTitle>
              <CardDescription>Distribution of children by age</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                // Skeleton for bar chart
                <div className="h-[250px] flex items-center justify-center">
                  <div className="w-full space-y-4">
                    {/* Chart area skeleton */}
                    <div className="flex items-end justify-between h-32 space-x-2">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 bg-gray-200 rounded-t animate-pulse" style={{ height: '60%' }}></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 bg-gray-200 rounded-t animate-pulse" style={{ height: '40%' }}></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 bg-gray-200 rounded-t animate-pulse" style={{ height: '80%' }}></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 bg-gray-200 rounded-t animate-pulse" style={{ height: '30%' }}></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    {/* Loading text */}
                    <div className="text-center text-sm text-gray-500">
                      Loading chart data...
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="h-[250px] flex items-center justify-center text-red-600">
                  <div className="text-center">
                    <p>Failed to load chart data</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : childrenStats ? (
                <ChartContainer
                  config={{
                    count: {
                      label: "Children Count",
                      color: "#10b981", // Green
                    },
                  }}
                  className="h-[250px]"
                >
                  <BarChart
                    data={Object.entries(childrenStats.childrenByAgeGroup).map(([ageGroup, count]) => ({
                      ageGroup: `${ageGroup} years`,
                      count: count,
                    }))}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="ageGroup" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}

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
