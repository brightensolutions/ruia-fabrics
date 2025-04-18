"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import "react-toastify/dist/ReactToastify.css"
import { Skeleton } from "@/components/ui/skeleton"

interface WelcomeContent {
  title: string
  paragraph1: string
  paragraph2: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
}

export function InfiniteMovingCardsDemo() {
  const [content, setContent] = useState<WelcomeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWelcomeContent = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/welcome")

        if (!response.ok) {
          throw new Error("Failed to fetch welcome content")
        }

        const data = await response.json()
        setContent(data)
      } catch (err) {
        console.error("Error fetching welcome content:", err)
        setError("Failed to load content. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWelcomeContent()
  }, [])

  if (loading) {
    return (
      <div className="relative bg-white z-40 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-32 pt-9 pb-16">
          <div className="text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-32 w-full mx-auto mb-6" />
            <Skeleton className="h-32 w-full mx-auto mb-12" />
            <div className="flex justify-center gap-6">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative bg-white z-40 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-32 pt-9 pb-16">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white z-40 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-32 pt-9 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-rubik font-bold mb-6 bg-gradient-to-r from-custom-green to-custom-black bg-clip-text text-transparent">
            {content?.title || "Welcome To Ruia Fabrics"}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:max-w-[90%] w-full mx-auto"
          >
            <p className="text-lg sm:text-2xl text-custom-black font-semibold font-abel mb-6 leading-relaxed">
              {content?.paragraph1}
            </p>
            <p className="text-lg sm:text-2xl text-custom-black font-semibold font-abel mb-12 leading-relaxed">
              {content?.paragraph2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-6"
          >
            <Link
              href={content?.button1Link || "/compnay/about-us"}
              className="inline-flex items-center px-8 py-3 rounded-[5px] bg-custom-green text-custom-white font-semibold font-rubik text-lg 
                       transition-all duration-300 transform"
            >
              {content?.button1Text || "About Us"}
            </Link>
            <Link
              href={content?.button2Link || "/compnay/contact-us"}
              className="inline-flex items-center px-8 py-3 rounded-[5px] border-2 border-custom-green font-semibold text-white font-rubik text-lg 
                       transition-all duration-300 bg-custom-green hover:scale-105 transform"
            >
              {content?.button2Text || "Contact Us"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
