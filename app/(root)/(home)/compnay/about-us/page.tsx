"use client"

import { useState, useEffect } from "react"
import ContactUs from "@/components/ContactUs"
import CompanyInfo from "@/components/mission-vision"
import ServicesSection from "@/components/ServicesSectionFn"
import { Skeleton } from "@/components/ui/skeleton"

interface AboutUsData {
  title: string
  description: string
  image: string
  linkHref: string
  linkLabel: string
}

const AboutusSection = () => {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about-us")

        if (!response.ok) {
          throw new Error("Failed to fetch about us information")
        }

        const data = await response.json()
        setAboutData(data)
      } catch (err) {
        console.error("Error fetching about us information:", err)
        setError("Failed to load about us information. Using default values.")

        // Set default values if API fails
        setAboutData({
          title: "About Us",
          description:
            "Ruia Fabrics is a leading name in the textile industry, specializing in high-quality Velvet, Linen, and Viscose fabrics. With a legacy built on innovation, craftsmanship, and sustainability, we proudly cater to both domestic and international markets—offering competitive, world-class textile solutions that meet the evolving demands of fashion and lifestyle industries.",
          image: "/company/about-us-images.jpg",
          linkHref: "/compnay/contact-us",
          linkLabel: "Contact Us",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  return (
    <>
      <div>
        {loading ? (
          <div className="bg-custom-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2">
                  <Skeleton className="w-full aspect-[4/3] rounded-lg" />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ServicesSection
            image={aboutData?.image || "/company/about-us-images.jpg"}
            title={aboutData?.title || "About Us"}
            description={
              aboutData?.description ||
              "Ruia Fabrics is a leading name in the textile industry, specializing in high-quality Velvet, Linen, and Viscose fabrics. With a legacy built on innovation, craftsmanship, and sustainability, we proudly cater to both domestic and international markets—offering competitive, world-class textile solutions that meet the evolving demands of fashion and lifestyle industries."
            }
            link={{
              href: aboutData?.linkHref || "/compnay/contact-us",
              label: aboutData?.linkLabel || "Contact Us",
            }}
          />
        )}
      </div>

      <div>
        <CompanyInfo />
      </div>

      <div>
        <ContactUs />
      </div>
    </>
  )
}

export default AboutusSection
