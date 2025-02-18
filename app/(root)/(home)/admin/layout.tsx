"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type React from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import { IoCloudUploadOutline } from "react-icons/io5"
import { IoIosContact } from "react-icons/io"
import { LuMessageCircleCode } from "react-icons/lu";

const sidebarItems = [
  { icon: IoCloudUploadOutline, label: "Upload Fabric", href: "/admin/Fabric-Photo" },
  { icon: IoIosContact, label: "Contact", href: "/admin/contact" },
  { icon: LuMessageCircleCode, label: "inquiries", href: "/admin/inquiries" },
  { icon: Users, label: "Client", href: "/admin/clients" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminId")
    toast.success("Logged Out")
    router.push("/admin/login")
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0B2447] text-white">
      <div className="p-5 text-xl font-bold md:block hidden">
        <Link href="/admin/Fabric-Photo" className="font-abel text-white text-[25px] m-auto">
          <Image src="/images/ruia fab.png" alt="logo" width={120} height={100} />
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeDrawer}>
                <span
                  className={`flex items-center p-3 rounded-[5px] space-x-3 hover:bg-greencolor transition-colors ${
                    pathname === item.href ? "bg-greencolor" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-white bg-greencolor space-x-2"
          onClick={() => {
            handleLogout()
            closeDrawer()
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {!isMobile && (
        <aside className="w-64 shadow-lg">
          <SidebarContent />
        </aside>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isMobile && (
          <header className="bg-[#0B2447] text-white p-4 flex justify-between items-center">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Link href="/admin/Fabric-Photo" className="font-abel text-white text-[25px] m-auto">
              <Image src="/images/ruia fab.png" alt="logo" width={80} height={60} />
            </Link>
          </header>
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

