"use client"
import { useState, useEffect } from "react"
import { InfiniteMovingCards } from "./ui/nfinite-moving-cards"
import { motion } from "framer-motion"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Skeleton } from "@/components/ui/skeleton"

interface FabricPhoto {
  _id: string
  imageUrls: string[]
}

export function InfiniteMovingCardsDemo() {
  const [fabricPhotos, setFabricPhotos] = useState<FabricPhoto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFabricPhotos()
  }, [])

  const fetchFabricPhotos = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/get-fabric-photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch fabric photos")
      }

      const data = await response.json()
      setFabricPhotos(data.photos)
    } catch (error) {
      console.error("Error fetching fabric photos:", error)
      toast.error("Failed to load fabric photos. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fabricItems = fabricPhotos.flatMap((photo) =>
    photo.imageUrls.map((url, index) => ({
      imageUrl: url,
      altText: `Fabric ${index + 1}`,
      title: `Fabric ${index + 1}`,
      description: `Beautiful fabric from our collection`,
    })),
  )

  return (
    <div className="relative bg-white z-40 overflow-hidden">
      <ToastContainer />
      
      {/* Background Decoration */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-custom-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-custom-green/10 rounded-full blur-3xl" />
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-32 pt-9 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-rubik font-bold mb-6 bg-gradient-to-r from-custom-green to-custom-black bg-clip-text text-transparent">
            Welcome to Ruia Fabrics
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg sm:text-xl text-custom-black/80 font-abel mb-6 leading-relaxed">
              Established in 1990, Ruia Fabrics has been a leading name in the textile industry, offering premium fabrics
              like voile, chiffon, crepe, georgette, and velvet. With a strong commitment to quality and sustainability, we
              produce world-class fabrics, catering to both domestic and international markets.
            </p>
            <p className="text-lg sm:text-xl text-custom-black/80 font-abel mb-12 leading-relaxed">
              Our vision is to combine traditional craftsmanship with modern innovation, ensuring that every fabric we
              create is of the highest quality. Join us in our journey towards a sustainable future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-6"
          >
            <Link
              href="/company/about-us"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-custom-green text-custom-white font-rubik text-lg 
                       transition-all duration-300 hover:bg-custom-black hover:scale-105 transform"
            >
              About Us
            </Link>
            <Link
              href="/company/contact-us"
              className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-custom-green text-custom-green font-rubik text-lg 
                       transition-all duration-300 hover:bg-custom-green hover:text-custom-white hover:scale-105 transform"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Fabric Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20"
        >
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-64 rounded-lg bg-custom-green/10"
                />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 z-10" />
              <InfiniteMovingCards
                items={fabricItems}
                direction="right"
                speed="slow"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
