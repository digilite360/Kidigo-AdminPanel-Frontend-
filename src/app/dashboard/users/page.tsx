import { DashboardLayout } from "@/components/DashboardLayout"
import { UsersTable } from "@/components/UsersTable"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersTable />
    </DashboardLayout>
  )
}
