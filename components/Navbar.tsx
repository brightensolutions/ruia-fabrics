"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { CiMenuBurger } from "react-icons/ci"
import { MdCancel } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MenuData {
  id: string
  name: string
  href?: string
  dropdown?: DropdownItem[]
}

interface DropdownItem {
  id: string
  name: string
  href?: string
}

interface Product {
  _id: string
  title: string
}

export function NavbarMenu() {
  const [productDropdown, setProductDropdown] = useState<DropdownItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const products: Product[] = await response.json()

          // Transform products into dropdown items
          const dropdownItems = products.map((product) => ({
            id: product.title.toLowerCase().replace(/\s+/g, "-"),
            name: product.title,
            href: `/compnay/product#${product.title.toLowerCase().replace(/\s+/g, "-")}`,
          }))

          setProductDropdown(dropdownItems)
        } else {
          // Fallback to default items if API fails
          setProductDropdown([
            { id: "cotton", name: "Cotton Fabric", href: "/compnay/product#cotton" },
            { id: "viscose", name: "Viscose Fabric", href: "/compnay/product#viscose" },
            { id: "linen", name: "Linen", href: "/compnay/product#linen" },
            { id: "velvet", name: "Velvet", href: "/compnay/product#velvet" },
          ])
        }
      } catch (error) {
        console.error("Error fetching products for navbar:", error)
        // Fallback to default items if API fails
        setProductDropdown([
          { id: "cotton", name: "Cotton Fabric", href: "/compnay/product#cotton" },
          { id: "viscose", name: "Viscose Fabric", href: "/compnay/product#viscose" },
          { id: "linen", name: "Linen", href: "/compnay/product#linen" },
          { id: "velvet", name: "Velvet", href: "/compnay/product#velvet" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Update the menuData array to include dynamic dropdown items for the Product section
  const menuData: MenuData[] = [
    { id: "Home", name: "Home", href: "/" },
    { id: "About Us", name: "About Us", href: "/compnay/about-us" },
    {
      id: "Product",
      name: "Product",
      href: "/compnay/product",
      dropdown: productDropdown,
    },
    {
      id: "Business",
      name: "Business",
      href: "/compnay/Market",
      dropdown: [
        { id: "weaving", name: "Weaving", href: "/compnay/Market#weaving" },
        { id: "trading", name: "Trading", href: "/compnay/Market#trading" },
      ],
    },
  ]

  return (
    <div className="relative w-full">
      <Navbar menuData={menuData} loading={loading} />
    </div>
  )
}

function Navbar({ menuData, loading }: { menuData: MenuData[]; loading: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [scrolled])

  const toggleDrawer = () => setIsOpen((prevState) => !prevState)

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoverDropdown(id)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverDropdown(null)
    }, 300) // Small delay to prevent flickering
  }

  const handleProductClick = (e: React.MouseEvent, menuItem: MenuData) => {
    if (menuItem.dropdown) {
      // Only prevent default for mobile
      if (window.innerWidth < 768) {
        e.preventDefault()
        toggleDropdown(menuItem.id)
      }
    } else {
      setActive(menuItem.name)
      setOpenDropdown(null)
    }
  }

  const handleDropdownItemClick = (item: DropdownItem) => {
    setOpenDropdown(null)
    setHoverDropdown(null)
    setIsOpen(false)
  }

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transformOrigin: "top center",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-custom-cream shadow-lg" : "bg-custom-green",
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
              className={cn("", scrolled ? "mix-blend-difference contrast-200" : "")}
            />
          </Link>

          <div className="flex space-x-12">
            {menuData.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                ref={menu.id === "Product" ? dropdownRef : null}
                onMouseEnter={() => menu.dropdown && handleMouseEnter(menu.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center">
                  <Link
                    href={menu.href || "#"}
                    className={cn(
                      "font-rubik text-[20px] transition-colors duration-200 tracking-wide flex items-center",
                      active === menu.name
                        ? "text-black font-medium"
                        : scrolled
                          ? "text-custom-black hover:text-custom-green active:text-custom-green"
                          : "text-white hover:text-black",
                    )}
                    onClick={(e) => handleProductClick(e, menu)}
                  >
                    {menu.name}
                    {menu.dropdown && (
                      <span
                        className={cn(
                          "ml-1 transition-transform duration-300",
                          hoverDropdown === menu.id ? "rotate-180" : "",
                        )}
                      >
                        <IoIosArrowDown className="text-sm" />
                      </span>
                    )}
                  </Link>
                </div>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {menu.dropdown && hoverDropdown === menu.id && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-2 w-56 z-50 overflow-hidden"
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                        {/* Decorative top accent */}
                        <div className="h-1 w-full bg-custom-green"></div>

                        <div className="py-2">
                          {loading && menu.id === "Product" ? (
                            <div className="px-4 py-3 flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-custom-green border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            menu.dropdown.map((item, index) => (
                              <motion.div key={item.id} variants={itemVariants}>
                                <Link
                                  href={item.href || "#"}
                                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-custom-green transition-colors duration-200 flex items-center group"
                                  onClick={() => handleDropdownItemClick(item)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-custom-green mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                  <span className="font-medium">{item.name}</span>
                                  <span className="ml-auto transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200 opacity-0 group-hover:opacity-100">
                                    →
                                  </span>
                                </Link>
                                {menu.dropdown && index < menu.dropdown.length - 1 && (
                                  <div className="mx-4 border-t border-gray-100"></div>
                                )}
                              </motion.div>
                            ))
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <Link
            href="/compnay/contact-us"
            className={cn(
              "px-6 py-3 rounded text-[15px] font-rubik transition-all duration-300",
              "hover:bg-custom-black active:transform active:scale-95",
              scrolled ? "bg-custom-green text-white" : "bg-custom-cream text-custom-green",
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
              className={cn("", scrolled ? "mix-blend-difference contrast-200" : "")}
            />
          </Link>
          <button
            onClick={toggleDrawer}
            className={cn(
              "transition-all text-[25px] duration-300 mix-blend-difference contrast-200",
              scrolled ? "" : "mix-blend-difference contrast-200",
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
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="flex items-center text-custom-black hover:text-custom-green transition-colors duration-200"
                      >
                        {item.name}
                        <span
                          className={cn(
                            "ml-2 transition-transform duration-300",
                            openDropdown === item.id ? "rotate-180" : "",
                          )}
                        >
                          <IoIosArrowDown className="text-sm" />
                        </span>
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                          >
                            {loading && item.id === "Product" ? (
                              <div className="py-2 flex items-center">
                                <div className="w-4 h-4 border-2 border-custom-green border-t-transparent rounded-full animate-spin mr-2"></div>
                                <span>Loading...</span>
                              </div>
                            ) : (
                              item.dropdown.map((dropdownItem, index) => (
                                <motion.li
                                  key={dropdownItem.id}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={dropdownItem.href || "#"}
                                    className="text-custom-black hover:text-custom-green transition-colors duration-200 text-base flex items-center"
                                    onClick={() => handleDropdownItemClick(dropdownItem)}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-custom-green mr-2"></span>
                                    {dropdownItem.name}
                                  </Link>
                                </motion.li>
                              ))
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={toggleDrawer}
                      className="text-custom-black hover:text-custom-green transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/compnay/contact-us"
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
