"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { LogOut,Award, ImageIcon, FileText, Home, Info, Phone, Briefcase, Leaf, Menu, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileView, setIsMobileView] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Check if we're on mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    // Initial check
    checkMobileView()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  // Authentication check
  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [user, loading, pathname, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-custom-green" />
      </div>
    )
  }

  // If on login page, just render the login page without the admin layout
  if (pathname === "/admin/login") {
    return children
  }

  // If not authenticated and not on login page, don't render anything (will redirect in useEffect)
  if (!user && pathname !== "/admin/login") {
    return null
  }

  // If authenticated, render the admin layout with sidebar
  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/slider", icon: ImageIcon, label: "Slider Images" },
    { href: "/admin/brands", icon: Award, label: "Brand Logos" },
    { href: "/admin/about", icon: Info, label: "About Us" },
    { href: "/admin/sustainable", icon: Leaf, label: "Sustainable" },
    { href: "/admin/contact", icon: Phone, label: "Contact Us" },
    { href: "/admin/products", icon: FileText, label: "Products" },
    { href: "/admin/business", icon: Briefcase, label: "Business" },
  ]

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-custom-cream bg-custom-green text-white">
        <h2 className="text-xl font-rubik font-bold">Ruia Fabrics</h2>
        <p className="text-sm font-roboto">Admin Panel</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Button
                className={` ${pathname === item.href ? "bg-custom-green rounded-xl text-white" : "text-custom-green"} w-full  justify-start  hover:bg-custom-cream/20 hover:text-black`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-custom-cream">
        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-custom-green text-white">{user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium font-rubik text-custom-green">{user?.name}</p>
            <p className="text-xs text-gray-500 font-roboto">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full border-custom-green text-custom-green hover:bg-custom-green hover:text-white"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-custom-cream/10">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden fixed h-screen md:flex md:w-64 bg-custom-white border-r border-custom-cream flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden bg-custom-white border-b border-custom-cream p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6 text-custom-green" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-custom-white">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold font-rubik text-custom-green">Ruia Fabrics</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 md:w-[71.3%] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}
