import { DashboardLayout } from "@/components/DashboardLayout"
import { OrdersTable } from "@/components/OrdersTable"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrdersTable />
    </DashboardLayout>
  )
}
