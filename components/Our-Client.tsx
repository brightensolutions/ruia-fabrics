"use client"

import { cn } from "@/lib/utils"
import Marquee from "./ui/marquee"
import Image from "next/image"
import { motion } from "framer-motion"

const clients = [
  { name: "Client 1", logo: "/images/logo.jpg" },
  { name: "Client 2", logo: "/images/logo.jpg" },
  { name: "Client 3", logo: "/images/logo.jpg" },
  { name: "Client 4", logo: "/images/logo.jpg" },
  { name: "Client 5", logo: "/images/logo.jpg" },
  { name: "Client 6", logo: "/images/logo.jpg" },
]

const firstRow = clients.slice(0, clients.length / 2)
const secondRow = clients.slice(clients.length / 2)

const ClientLogo = ({ logo, name }: { logo: string; name: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative w-40 h-40 mx-4 overflow-hidden rounded-xl bg-custom-white shadow-lg",
        "transition-all duration-300 hover:shadow-xl",
      )}
    >
      <Image
        className="object-contain p-4"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`${name} logo`}
        src={logo || "/placeholder.svg"}
      />
    </motion.div>
  )
}

export function ClientMarquee() {
  return (
    <div className="relative w-full bg-custom-cream py-16 overflow-hidden  z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-rubik text-3xl md:text-4xl font-bold text-custom-green text-center mb-12"
        >
          Our Trusted Clients
        </motion.h2>

        <div className="relative">
          <Marquee pauseOnHover className="[--duration:30s] mb-8">
            {firstRow.map((client) => (
              <ClientLogo key={client.name} {...client} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:40s]" reverse>
            {secondRow.map((client) => (
              <ClientLogo key={client.name} {...client} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-custom-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-custom-cream to-transparent" />
        </div>
      </div>
    </div>
  )
}

