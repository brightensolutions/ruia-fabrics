"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type React from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";

const sidebarItems = [
  // { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: IoCloudUploadOutline, label: "Upload Fabric", href: "/admin/Fabric-Photo" },
  { icon: IoIosContact, label: "contact", href: "/admin/contact" },
  { icon: Users, label: "client", href: "/admin/clients" },
  // { icon: Settings, label: "Settings", href: "/admin/settings" },  
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    // Remove the adminId from localStorage
    localStorage.removeItem("adminId");

    // Show a success toast
    toast.success("Logged Out");

    // Redirect to the login page
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0B2447] text-white">
      <div className="p-5 text-xl font-bold ">
        <Link href="/admin/Fabric-Photo" className="font-abel text-white text-[25px] m-auto ">
          <Image
            src="/images/ruia fab.png"
            alt="logo"
            width={120}
            height={100}
          />
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span
                  className={`flex items-center p-3 rounded-[5px] space-x-3  hover:bg-greencolor transition-colors ${
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
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {!isMobile && (
        <aside className="w-64 shadow-lg">
          <SidebarContent />
        </aside>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
