"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatePresence, motion } from "framer-motion"

interface Slide {
  _id: string
  title: string
  image: string
  order: number
}

export const Homevideo = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/sliders")
        if (!response.ok) throw new Error("Failed to fetch sliders")

        const data = await response.json()
        // Ensure slides are sorted by order
        const sortedData = [...data].sort((a, b) => a.order - b.order)
        console.log(
          "Sorted slides by order:",
          sortedData.map((s) => `${s.title} (order: ${s.order})`),
        )
        setSlides(sortedData)
      } catch (error) {
        console.error("Error fetching sliders:", error)
        // Fallback to default slides if API fails
        setSlides([
          {
            _id: "1",
            title: "Linen Serenity",
            image: "/slider-images/Linen .png",
            order: 0,
          },
          {
            _id: "2",
            title: "Comfort In Cotton",
            image: "/slider-images/Cotton.png",
            order: 1,
          },
          {
            _id: "3",
            title: "Lustrous Viscose Flow",
            image: "/slider-images/Viscose.png",
            order: 2,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      goToNext()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right - previous slide
      goToPrevious()
    }
  }

  // Auto-advance slides every 2 seconds
  useEffect(() => {
    if (slides.length === 0) return

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 2000)

    return () => clearInterval(slideInterval)
  }, [slides.length])

  const goToPrevious = () => {
    if (slides.length === 0) return
    setCurrentSlide((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    if (slides.length === 0) return
    setCurrentSlide((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <div className="w-full h-screen mt-20 overflow-hidden">
        <div className="h-full w-full relative flex items-center justify-center">
          <div className="w-[85%] h-[85%] relative">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen mt-20 overflow-hidden flex items-center justify-center">
        <p className="text-gray-500">No slider images available</p>
      </div>
    )
  }

  return (
    <div
      ref={sliderRef}
      className="w-full h-screen mt-20 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#d3a456] opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#d3a456] opacity-30"></div>

      {/* Main image section - now takes full width */}
      <div className="h-full w-full relative flex items-center justify-center">
        <div className="w-[85%] h-[85%] relative">
          {/* Decorative frame */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#d3a456] opacity-60"></div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#d3a456] opacity-60"></div>

          <div className="w-full h-full relative">
            <div className="lg:max-h-[85vh] h-full w-full overflow-hidden shadow-2xl rounded-md">
              {/* Crossfade Image Transition */}
              <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                  <AnimatePresence key={slide._id} initial={false}>
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      >
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          className="w-full h-full object-cover lg:object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white px-5 py-2"
                >
                  <h1 className="text-black text-center font-bold text-xl">{slides[currentSlide].title}</h1>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation dots - visible on all devices */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex space-x-3 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full shadow-md">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#d3a456] w-6" : "bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-custom-green hover:bg-custom-green/85 backdrop-blur-sm rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-custom-green hover:bg-custom-green/85 backdrop-blur-sm rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
