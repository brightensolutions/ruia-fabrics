"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CiMenuBurger } from "react-icons/ci"
import { MdCancel } from "react-icons/md"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import { cn } from "@/lib/utils"

interface MenuData {
  id: string
  name: string
  href?: string
}

const menuData: MenuData[] = [
  { id: "Home", name: "Home", href: "/" },
  { id: "About Us", name: "About Us", href: "/compnay/about-us" },
  { id: "Product", name: "Product", href: "/compnay/product" },
  { id: "Infrastructure", name: "Infrastructure", href: "/compnay/Infrastructure" },
  { id: "Market", name: "Market", href: "/compnay/Market" },
]

export function NavbarMenu() {
  return (
    <div className="relative w-full">
      <Navbar />
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const toggleDrawer = () => setIsOpen((prevState) => !prevState)

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-custom-cream shadow-lg" : "bg-white",
      )}
    >
      {/* Desktop Navigation */}
      <div className="md:block hidden">
        <div className="flex w-full justify-between items-center max-w-[1440px] mx-auto px-8 py-6">
          <Link href="/" className="relative">
            <Image
              src="/images/ruia fab.png"
              alt="logo"
              width={120}
              height={120}
              className={cn(
                "transition-all duration-300 mix-blend-difference  contrast-200",
                scrolled ? "" : "mix-blend-difference  contrast-200",
              )}
            />
          </Link>

          <div className="flex space-x-12">
            {menuData.map((menu) => (
              <Link
                href={menu.href || "#"}
                key={menu.id}
                className={cn(
                  "font-rubik text-[20px] transition-colors duration-200 tracking-wide",
                  active === menu.name
                    ? "text-custom-green  font-medium"
                    : scrolled
                      ? "text-custom-black hover:text-custom-green"
                      : "text-black hover:text-custom-green",
                )}
                onClick={() => setActive(menu.name)}
              >
                {menu.name}
              </Link>
            ))}
          </div>

          <Link
            href="/compnay/contact-us"
            className={cn(
              "px-6 py-3 rounded text-[15px] font-rubik transition-all duration-300",
              "hover:bg-custom-black active:transform active:scale-95",
              scrolled ? "bg-custom-green text-white" : "bg-custom-green text-white",
            )}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden block">
        <div className="flex w-full items-center justify-between px-5 py-4">
          <Link href="/" className="relative">
            <Image
              src="/images/ruia fab.png"
              alt="logo"
              width={100}
              height={100}
              className={cn(
                "transition-all duration-300 mix-blend-difference  contrast-200",
                scrolled ? "" : "mix-blend-difference  contrast-200",
              )}
            />
          </Link>
          <button
            onClick={toggleDrawer}
            className={cn(
              "transition-all text-[25px] duration-300 mix-blend-difference  contrast-200",
              scrolled ? "" : "mix-blend-difference  contrast-200",
            )}
          >
            <CiMenuBurger />
          </button>
        </div>

        <Drawer open={isOpen} onClose={toggleDrawer} direction="right" className="bg-custom-cream w-4/5">
          <div className="p-6">
            <button
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-custom-black hover:text-custom-green transition-colors"
            >
              <MdCancel className="text-3xl" />
            </button>
            <ul className="space-y-6 mt-16">
              {menuData.map((item) => (
                <li key={item.id} className="text-lg font-rubik">
                  <Link
                    href={item.href || "#"}
                    onClick={toggleDrawer}
                    className="text-custom-black hover:text-custom-green transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/company/contact-us"
                  onClick={toggleDrawer}
                  className="bg-custom-green text-white px-6 py-2 rounded text-[15px] font-rubik 
                           transition-all duration-300 hover:bg-custom-black active:transform active:scale-95"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

