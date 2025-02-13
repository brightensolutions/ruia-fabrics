import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { FloatingDockDemo } from "./socialMediaIcon"
import PulsingWhatsApp from "./PulsingWhatsApp"

const Footer: React.FC = () => {
  const footerData = [
    {
      title: "Company",
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/compnay/about-us" },
        { name: "Infrastructure", url: "/compnay/Infrastructure" },
        { name: "Product", url: "/compnay/product" },
        { name: "Market", url: "/compnay/Market" },
        { name: "Contact", url: "/compnay/contact-us" },
      ],
    },
    {
      title: "Connect Us",
      links: [
        { name: "+91 7021418483", url: "#" },
        { name: "info@ruiafabrics.com", url: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-custom-green relative z-40 pt-12 pb-6">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/ruia fab.png"
                alt="Ruia Fabrics Logo"
                width={180}
                height={180}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-custom-cream font-roboto text-sm">
              Crafting excellence in textiles since 1952. Your trusted partner for premium fabrics and sustainable
              solutions.
            </p>
          </div>

          {footerData.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h2 className="font-rubik text-xl font-bold text-custom-white mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.url}
                      className="text-custom-cream hover:text-custom-white transition-colors duration-200 font-abel text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-custom-cream/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-custom-cream font-roboto mb-4 md:mb-0">
            © 2025{" "}
            <Link href="https://brightensolutions.com/" className="hover:underline">
              brightensolutions™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="hidden md:flex">
            <FloatingDockDemo />
          </div>
        </div>
      </div>

      <div className="fixed z-[999] bottom-4 right-4">
        <PulsingWhatsApp />
      </div>
    </footer>
  )
}

export default Footer

