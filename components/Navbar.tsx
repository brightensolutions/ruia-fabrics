"use client";
import React, { useState, ReactNode } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuLink {
  label: string;
  href: string;
}

interface Product {
  title: string;
  href: string;
  src: string;
  description: string;
}

interface MenuData {
  id: string;
  name: string;
  content: MenuLink[] | Product[];
}

const menuData: MenuData[] = [
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
        description:
          "Never write from scratch again. Go from idea to blog in minutes.",
      },
      {
        title: "Rogue",
        href: "https://userogue.com",
        src: "/Images/saressdemo.jpg",
        description:
          "Respond to government RFPs, RFIs and RFQs 10x faster using AI.",
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

export function NavbarMenu(): JSX.Element {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-0" />
    </div>
  );
}

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps): JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-[100%] mx-auto z-50", className)}
    >
        <Menu setActive={setActive}>
          <div className="flex w-[100%] flex-row justify-between items-center md:max-w-[1440px] m-auto px-[20px]">
            <div>
              <Link href="/" className="font-abel text-[25px] font-bold">
                Logo
              </Link>
            </div>
            <div className="flex flex-row space-x-9">
              {menuData.map((menu) => (
                <MenuItem
                  key={menu.id}
                  setActive={setActive}
                  active={active}
                  item={menu.name}
                >
                  {menu.id === "products" ? (
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
                      {(menu.content as Product[]).map((product) => (
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
                      {(menu.content as MenuLink[]).map((link) => (
                        <HoveredLink
                          key={link.label}
                          href={link.href}
                          className="text-white"
                        >
                          <p className="text-white/85 font-rubik text-[18px]">
                            {link.label}
                          </p>
                        </HoveredLink>
                      ))}
                    </div>
                  )}
                </MenuItem>
              ))}
            </div>
            <div>
              <Link href="/" className="inline-block text-[18px] bg-white text-black  py-2 px-5 rounded-[5px] font-rubik">Contact Us</Link>
            </div>
          </div>
        </Menu>
    </div>
  );
}
