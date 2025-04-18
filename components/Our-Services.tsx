"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DirectionAwareHover } from "./ui/direction-aware-hover"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface Service {
  _id: string
  imageUrl: string
}

interface ServiceContent {
  title: string
  paragraph1: string
  paragraph2: string
}

const OurServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [content, setContent] = useState<ServiceContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch services
        const servicesResponse = await fetch("/api/services")
        if (!servicesResponse.ok) {
          throw new Error("Failed to fetch services")
        }
        const servicesData = await servicesResponse.json()

        // Fetch content
        const contentResponse = await fetch("/api/services/content")
        if (!contentResponse.ok) {
          throw new Error("Failed to fetch service content")
        }
        const contentData = await contentResponse.json()

        setServices(servicesData)
        setContent(contentData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load content. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Default services if none are found in the database
  const defaultServices: Service[] = [
    {
      _id: "1",
      imageUrl: "/fabric/fabric1.jpeg",
    },
    {
      _id: "2",
      imageUrl: "/fabric/fabric3.jpeg",
    },
    {
      _id: "3",
      imageUrl: "/fabric/fabric2.jpeg",
    },
  ]

  // Use default services if none are found or if there are fewer than 3
  const displayServices =
    services.length >= 3
      ? services.slice(0, 3)
      : services.length > 0
        ? [...services, ...defaultServices.slice(services.length, 3)]
        : defaultServices

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  if (loading) {
    return (
      <div className="bg-custom-green py-24 relative z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-3/4 mx-auto mb-6 bg-custom-white/20" />
            <Skeleton className="h-24 w-[70%] mx-auto mb-2 bg-custom-white/20" />
            <Skeleton className="h-24 w-[72%] mx-auto bg-custom-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-64 rounded-[10px] bg-custom-white/20" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-custom-green py-24 relative z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-custom-white">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-custom-green py-24 relative z-40">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-semibold font-abel text-custom-white mb-6">
            {content?.title || "Textile Is What We Do"}
          </h2>
          <p className="md:w-[70%] w-full mx-auto font-roboto font-normal text-custom-white text-lg leading-relaxed mb-2">
            {content?.paragraph1 ||
              "At Ruia Fabrics, textiles are at the core of who we are. We specialize in high-quality Velvet, Voile, Chiffon, Crepe, Georgette, and Linen fabrics, tailored for both domestic and international markets."}
          </p>
          <p className="md:w-[72%] w-full mx-auto font-roboto font-normal text-custom-white text-lg leading-relaxed">
            {content?.paragraph2 ||
              "Guided by innovation and a commitment to sustainability, we offer eco-conscious fabric solutions including BCI Cotton, European Flax, FSE Viscose, EcoLIVA, and EcoVero—delivering style with responsibility."}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16" variants={containerVariants}>
          {displayServices.map((service, index) => (
            <motion.div key={service._id} className="relative" variants={itemVariants}>
              <DirectionAwareHover className="rounded-[10px]" imageUrl={service.imageUrl}>
                <div className="p-6 text-custom-white"></div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OurServices
