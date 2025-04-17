"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, FileText, Info } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Dashboard</h1>
      </header>

      <main className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-custom-cream">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-rubik text-custom-green">Slider Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-custom-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-rubik">3</div>
              <p className="text-xs text-muted-foreground font-roboto">Active slider images</p>
            </CardContent>
          </Card>
          <Card className="border-custom-cream">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-rubik text-custom-green">Products</CardTitle>
              <FileText className="h-4 w-4 text-custom-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-rubik">3</div>
              <p className="text-xs text-muted-foreground font-roboto">Products in catalog</p>
            </CardContent>
          </Card>
          <Card className="border-custom-cream">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-rubik text-custom-green">Content Sections</CardTitle>
              <FileText className="h-4 w-4 text-custom-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-rubik">4</div>
              <p className="text-xs text-muted-foreground font-roboto">Website content sections</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-custom-cream mt-6">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">Welcome to Ruia Fabrics Admin</CardTitle>
            <CardDescription className="font-roboto">
              This is your admin dashboard where you can manage your website content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-custom-cream/10 p-4 rounded-lg border border-custom-cream">
              <p className="font-roboto">
                You are logged in as <span className="font-medium text-custom-green">{user?.name}</span> ({user?.email}
                ).
              </p>
              <p className="mt-4 font-roboto">
                Use the {typeof window !== "undefined" && window.innerWidth < 768 ? "menu" : "sidebar"} to navigate
                between different sections of the admin panel.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium font-rubik text-custom-green mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center border-custom-cream hover:bg-custom-cream/20 hover:text-custom-green"
                  asChild
                >
                  <Link href="/admin/slider">
                    <ImageIcon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-roboto">Manage Slider</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center border-custom-cream hover:bg-custom-cream/20 hover:text-custom-green"
                  asChild
                >
                  <Link href="/admin/products">
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-xs font-roboto">Manage Products</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center border-custom-cream hover:bg-custom-cream/20 hover:text-custom-green"
                  asChild
                >
                  <Link href="/admin/about">
                    <Info className="h-5 w-5 mb-2" />
                    <span className="text-xs font-roboto">Edit About Us</span>
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
