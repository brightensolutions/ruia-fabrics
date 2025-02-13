"use client"

import { NavbarMenu } from "@/components/Navbar"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation"
import type React from "react" // Added import for React

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    // For admin routes, render only the children without Navbar and Footer
    return <>{children}</>
  }

  // For non-admin routes, render with Navbar and Footer
  return (
    <>
      <NavbarMenu />
      {children}
      <Footer />
    </>
  )
}

