"use client"

import { useState, useEffect } from "react"
import ServicesSection from "@/components/ServicesSectionFn"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"

interface BusinessItem {
  _id: string
  title: string
  description: string
  titleColor: string
  paragraphColor: string
  mainImage: string
  overlayImage?: string
  sectionId: string
  bgcolor?: string
  sectioncolor?: string
  btncolor?: string
}

interface BusinessSection {
  title: string
  description: string
  image: string
}

export default function Business() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([])
  const [section, setSection] = useState<BusinessSection>({
    title: "Business",
    description: "",
    image: "/images/banner1.webp",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch business items
        const businessesResponse = await fetch("/api/business")
        const businessesData = await businessesResponse.json()
        setBusinesses(businessesData)

        // Fetch section data
        const sectionResponse = await fetch("/api/business-section")
        const sectionData = await sectionResponse.json()
        if (sectionData && sectionData._id) {
          setSection(sectionData)
        }
      } catch (error) {
        console.error("Error fetching business data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle hash navigation when page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1) // Remove the # character
      const element = document.getElementById(id)
      if (element) {
        // Add a slight delay to ensure the page is fully loaded
        setTimeout(() => {
          const navbarHeight = 100 // Approximate navbar height in pixels
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }, 300)
      }
    }
  }, [businesses]) // Re-run when businesses are loaded

  // Add hash change listener for navigation within the page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          setTimeout(() => {
            const navbarHeight = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }, 100)
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-custom-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
      </div>
    )
  }

  return (
    <div className="bg-custom-cream">
      <ServicesSection
        image={section.image}
        title={section.title}
        description={section.description}
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      {businesses.map((business, index) => (
        <div key={business._id} id={business.sectionId}>
          <AnimatedDetailsAndImage
            title={business.title}
            titleColor={business.titleColor}
            details={[{ paragraph: business.description }]}
            paragraphColor={business.paragraphColor}
            images={{
              main: business.mainImage,
              overlay: business.overlayImage,
            }}
            imagePosition={index % 2 === 0 ? "left" : "right"}
            connectUsLink="/compnay/contact-us"
            bgcolor={business.bgcolor}
            sectioncolor={business.sectioncolor}
            btncolor={business.btncolor}
          />
        </div>
      ))}
    </div>
  )
}
