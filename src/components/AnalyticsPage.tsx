"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  BarChart3,
  Download,
  Calendar,
  Filter
} from "lucide-react"

// Mock analytics data
const analyticsMetrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    description: "from last month",
    icon: DollarSign
  },
  {
    title: "New Customers",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    description: "from last month",
    icon: Users
  },
  {
    title: "Total Orders",
    value: "12,234",
    change: "+19%",
    trend: "up",
    description: "from last month",
    icon: ShoppingCart
  },
  {
    title: "Active Products",
    value: "89",
    change: "+12%",
    trend: "up",
    description: "from last month",
    icon: Package
  }
]

const topProducts = [
  { name: "Premium Package", sales: 234, revenue: "$70,200", growth: "+12%" },
  { name: "Basic Package", sales: 189, revenue: "$18,900", growth: "+8%" },
  { name: "Enterprise Package", sales: 156, revenue: "$93,600", growth: "+15%" },
  { name: "Starter Package", sales: 98, revenue: "$9,800", growth: "+5%" }
]

const recentActivity = [
  { action: "New user registered", user: "John Doe", time: "2 minutes ago", type: "user" },
  { action: "Order completed", user: "Jane Smith", time: "5 minutes ago", type: "order" },
  { action: "Product updated", user: "Admin", time: "10 minutes ago", type: "product" },
  { action: "Payment received", user: "Bob Johnson", time: "15 minutes ago", type: "payment" },
  { action: "User logged in", user: "Alice Brown", time: "20 minutes ago", type: "user" }
]

const conversionData = [
  { stage: "Visitors", count: 10000, percentage: 100 },
  { stage: "Sign-ups", count: 2500, percentage: 25 },
  { stage: "Trials", count: 1500, percentage: 15 },
  { stage: "Purchases", count: 800, percentage: 8 }
]

export function AnalyticsPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-600" />
      case "order":
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case "product":
        return <Package className="h-4 w-4 text-purple-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-yellow-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            View detailed analytics and performance metrics.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
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

      {/* Charts and Data Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Revenue chart will be displayed here</p>
                <p className="text-sm">Connect your analytics to see data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              User journey through your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-muted-foreground">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {stage.percentage}% conversion
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>
              Best selling products this month
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
                    <Badge variant="outline" className="text-green-600">
                      {product.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system activity and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
