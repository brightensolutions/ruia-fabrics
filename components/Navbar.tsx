"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

const menuData = [
  {
    id: "services",
    name: "Services",
    content: [
      { label: "Web Development", href: "/web-dev" },
      { label: "Interface Design", href: "/interface-design" },
      { label: "Search Engine Optimization", href: "/seo" },
      { label: "Branding", href: "/branding" },
    ],
  },
  {
    id: "products",
    name: "Products",
    content: [
      {
        title: "Algochurn",
        href: "https://algochurn.com",
        src: "/Images/saressdemo.jpg",
        description: "Prepare for tech interviews like never before.",
      },
      {
        title: "Tailwind Master Kit",
        href: "https://tailwindmasterkit.com",
        src: "/Images/saressdemo.jpg",
        description:
          "Production ready Tailwind CSS components for your next project.",
      },
      {
        title: "Moonbeam",
        href: "https://gomoonbeam.com",
        src: "/Images/saressdemo.jpg",
        description: "Never write from scratch again. Go from idea to blog in minutes.",
      },
      {
        title: "Rogue",
        href: "https://userogue.com",
        src: "/Images/saressdemo.jpg",
        description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    content: [
      { label: "Hobby", href: "/hobby" },
      { label: "Individual", href: "/individual" },
      { label: "Team", href: "/team" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
];

export function NavbarMenu() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {menuData.map((menu) => (
          <MenuItem
            key={menu.id}
            setActive={setActive}
            active={active}
            item={menu.name}
          >
            {/* Render content dynamically */}
            {menu.id === "products" ? (
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                {menu.content.map((product) => (
                  <ProductItem
                    key={product.title}
                    title={product.title}
                    href={product.href}
                    src={product.src}
                    description={product.description}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4 text-sm">
                {menu.content.map((link) => (
                  <HoveredLink key={link.label} href={link.href}>
                    {link.label}
                  </HoveredLink>
                ))}
              </div>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
