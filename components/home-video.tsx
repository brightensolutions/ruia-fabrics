"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Homevideo = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Slide data with images
  const slides = [
    {
      id: 1,
      mainImage: "/slider-images/Linen .png",
      title: "Linen Serenity",
    },
    {
      id: 2,
      mainImage: "/slider-images/Cotton.png",
      title: "Comfort In Cotton",
    },
    {
      id: 3,
      mainImage: "/slider-images/Viscose.png",
      title: "Lustrous Viscose Flow",
    },
    {
      id: 4,
      mainImage: "/slider-images/Velvet 1.png",
      title: "Pastel Luxe",
    },
    {
      id: 5,
      mainImage: "/slider-images/Velvet 2.png",
      title: "Luxe Velvet",
    },
    {
      id: 6,
      mainImage: "/slider-images/Velvet 3.png",
      title: "Textured Elegance",
    },
  ]

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true)
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

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [slides.length])

  const goToPrevious = () => {
    setCurrentSlide((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.8,
      },
    },
  }

  return (
    <motion.div
      ref={sliderRef}
      className="w-full h-screen mt-20 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5,
              }}
              className="w-full h-full relative"
            >
              <div className="lg:max-h-[85vh] h-full w-full overflow-hidden shadow-2xl rounded-md">
                <img
                  src={slides[currentSlide].mainImage || "/placeholder.svg"}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover lg:object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 ">
                <h1 className="bg-white px-5 py-2 text-black text-center font-bold text-xl">{slides[currentSlide].title}</h1>
              </div>
            </motion.div>
          </AnimatePresence>
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
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-custom-green hover:bg-custom-green/85  backdrop-blur-sm rounded-full transition-all duration-300"
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
    </motion.div>
  )
}
