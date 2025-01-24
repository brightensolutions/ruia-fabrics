"use client";
import React, { useState, ReactNode } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

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
  href?: string;
  content?: MenuLink[] | Product[];
}
const menuData: MenuData[] = [
  {
    id: "Home",
    name: "Home",
    href: "/",
  },
  {
    id: "About us",
    name: "About Us",
    href: "/compnay/about-us",
  },
  {
    id: "Product",
    name: "Product",
    href: "/compnay/product",
  },
  {
    id: "Infrastructure",
    name: "Infrastructure",
    href: "/compnay/Infrastructure",
  },
  {
    id: "Market",
    name: "Market",
    href: "/compnay/Market",
  },
];

export function NavbarMenu() {
  return (
    <div className="relative w-full flex items-center justify-center ">
      <Navbar className="top-0" />
    </div>
  );
}

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-[100%] mx-auto z-50 ", className)}
    >
      <div className="md:block hidden">
        <Menu setActive={setActive}>
          <div className="flex w-[100%] flex-row justify-between items-center  md:max-w-[1440px] m-auto px-[20px] ">
            <div>
              <Link href="/" className="font-abel text-white text-[25px] ">
                <Image
                  src="/images/ruia fab.png"
                  alt="logo"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div className="flex flex-row space-x-9">
              {menuData.map((menu) => (
                <Link href={menu.href || "#"} key={menu.id}>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item={menu.name}
                  >
                    {/* Add any custom content for the menu item */}
                    <div className="w-[45px] h-2 bg-greencolor"></div>
                  </MenuItem>
                </Link>
              ))}
            </div>

            <div>
              <Link
                href="/compnay/contact-us"
                className="inline-block text-[18px] bg-greycolor text-white   py-2 px-5 rounded-[5px] font-rubik"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Menu>
      </div>

      <div className="bg-darkgreen px-[20px] md:hidden block py-[10px]">
        <div className="flex w-[100%] items-center justify-between">
          <Link href="/" className="text-[45px]">
            <Image
              src="/images/ruia fab.png"
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
          <button onClick={toggleDrawer} className="text-[35px]">
            <CiMenuBurger />
          </button>
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bg-white w-[80%] h-full relative"
        >
          <div className="p-4">
            <button
              onClick={toggleDrawer}
              className="text-black mb-4 text-end absolute right-[5px]"
            >
              <MdCancel className="text-[35px] text-right " />
            </button>
            <ul className="space-y-4 mt-12">
              {menuData.map((item: MenuData) => (
                <li
                  key={item.id}
                  className="text-lg text-darkgreen font-rubik font-semibold"
                >
                  <Link href={item.href || "#"} onClick={toggleDrawer}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/compnay/contact-us"
                className="inline-block text-[18px] bg-greycolor text-white   py-2 px-5 rounded-[5px] font-rubik"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
