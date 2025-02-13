import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingBag, Package, Clock } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#0B2447]">Welcome to Admin Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#0B2447]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0B2447]">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#0B2447]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0B2447]">$12,345</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-[#0B2447]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0B2447]">123</div>
            <p className="text-xs text-muted-foreground">+5 new products</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-[#0B2447]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0B2447]">45</div>
            <p className="text-xs text-muted-foreground">12 orders processing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

