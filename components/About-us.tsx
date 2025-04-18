"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface SustainableFabric {
  _id: string
  name: string
  description: string
  image: string
  icon: string
  order: number
}

interface SustainableContent {
  title: string
  quote: string
  description: string
}

const SustainableFabrics = () => {
  const [fabrics, setFabrics] = useState<SustainableFabric[]>([])
  const [content, setContent] = useState<SustainableContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false })

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch fabrics
        const fabricsResponse = await fetch("/api/sustainable-fabrics")
        if (!fabricsResponse.ok) {
          throw new Error("Failed to fetch sustainable fabrics")
        }
        const fabricsData = await fabricsResponse.json()

        // Fetch content
        const contentResponse = await fetch("/api/sustainable-content")
        if (!contentResponse.ok) {
          throw new Error("Failed to fetch sustainable content")
        }
        const contentData = await contentResponse.json()

        setFabrics(fabricsData)
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

  // Default fabrics if none are found in the database
  const defaultFabrics: SustainableFabric[] = [
    {
      _id: "1",
      name: "Hemp Fabric",
      image: "/fabric/hemp final.jpeg.jpg",
      icon: "/Manufacturing/home-f-icon-1.png",
      description:
        "Durable and sustainable, hemp requires minimal water and no pesticides to grow. It produces strong, breathable fabrics that improve with each wash.",
      order: 0,
    },
    {
      _id: "2",
      name: "European Flax",
      image: "/fabric/linen .jpg",
      icon: "/Manufacturing/European flex logo.png",
      description:
        "European Flax is known for long, strong fibers, contributing to the luxurious feel and durability of linen.",
      order: 1,
    },
    {
      _id: "3",
      name: "Bamboo Fabric",
      image: "/fabric/bamboo.webp",
      icon: "/Manufacturing/home-f-icon-2.png",
      description:
        "Natural bamboo fiber is extracted without chemicals, offering antibacterial, deodorant properties with excellent elasticity and drapability for high-end light fabrics.",
      order: 2,
    },
    {
      _id: "4",
      name: "100% Organic Cotton",
      image: "/fabric/100cottonfabric.jpg",
      icon: "/Manufacturing/home-f-icon-3.png",
      description:
        "Grown without harmful chemicals, organic cotton creates soft, hypoallergenic fabrics while protecting farmer health and reducing environmental impact.",
      order: 3,
    },
    {
      _id: "5",
      name: "Tencel Fabric",
      image: "/fabric/image.png",
      icon: "/Manufacturing/home-f-icon-5.png",
      description:
        "Made from sustainable wood pulp using nanotechnology, Tencel is fully biodegradable, moisture-absorbent, antibacterial, and creates vibrant, breathable fabrics.",
      order: 4,
    },
  ]

  // Use default fabrics if none are found
  const displayFabrics = fabrics.length > 0 ? fabrics : defaultFabrics

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-custom-white to-custom-green/5 relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 max-w-4xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-24 w-full mx-auto mb-4" />
            <Skeleton className="h-16 w-5/6 mx-auto" />
          </div>

          <div className="space-y-16">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2">
                  <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
                <div className="w-full lg:w-1/2 p-6">
                  <div className="flex items-center mb-6">
                    <Skeleton className="w-16 h-16 mr-4 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                  </div>
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-custom-white to-custom-green/5 relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-custom-black">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-gradient-to-br from-custom-white to-custom-green/5 relative overflow-hidden py-24"
    >
      {/* Decorative elements */}
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sustainability Quote Section */}
        <motion.div variants={itemVariants} className="mb-20 max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl lg:text-5xl font-rubik font-bold text-custom-black mb-8">
            {content?.title || "Sustainable Style, Woven With Care."}
          </h2>

          <p className="text-xl text-custom-black font-abel font-semibold leading-relaxed">
            {content?.quote ||
              "\"Sustainability for us means creating long-term value for people, the planet, and shared prosperity. It's not just about doing good—it's about making a lasting impact through every choice we make.\""}
          </p>
          <p className="text-lg text-custom-black font-semibold font-abel mt-4">
            {content?.description ||
              "Our Responsible For framework reflects our commitment to mindful sourcing, ethical production, and conscious decision-making—ensuring every fabric is crafted with purpose and care."}
          </p>
        </motion.div>

        {/* Open Layout for All Fabrics */}
        <div className="space-y-16">
          {displayFabrics.map((fabric, index) => (
            <motion.div
              key={fabric._id}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              {/* Fabric Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={fabric.image || "/placeholder.svg"}
                    alt={fabric.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Fabric Content */}
              <div className="w-full lg:w-1/2 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={fabric.icon || "/placeholder.svg"}
                      alt={fabric.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-rubik font-bold text-custom-black">{fabric.name}</h3>
                </div>

                <div className="relative">
                  <p className="text-lg text-custom-black/80 font-roboto font-semibold leading-relaxed pt-6">
                    {fabric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SustainableFabrics
