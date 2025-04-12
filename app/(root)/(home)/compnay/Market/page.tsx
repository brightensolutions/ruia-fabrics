"use client"

import ServicesSection from "@/components/ServicesSectionFn"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"
import { useEffect } from "react"

const Market = () => {
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
  }, [])

  const greyFabric2 = {
    title: "Weaving",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "At Ruia Fabrics, our in-house weaving unit is equipped with 24 advanced air-jet looms, allowing us to produce high-quality woven fabrics with precision and efficiency. Our weaving division specializes in customized weaves and intricate patterns, ensuring innovation and versatility in fabric design.",
      },
      {
        paragraph:
          "In addition, we operate 110 cutting-edge velvet manufacturing machines, offering a diverse range of premium velvet fabrics for both the apparel and home furnishing markets. ",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/company/014A7597.JPG",
    },
    connectUsLink: "/compnay/contact-us",
  }

  const greyFabric = {
    title: "Trading ",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "We partner with leading textile mills across India to facilitate large-scale fabric manufacturing. This strategic collaboration enables us to deliver a cost-effective, diverse, and high-quality product range, catering to the demands of various industries. With a legacy spanning over four decades, our commitment to sustainable textile practices remains at the core of our operations.",
      },
      {
        paragraph:
          "The mills we collaborate with in India adhere to the highest quality standards and hold certifications such as OEKO-TEX®, BCI, GOTS, Verified Sustainable Viscose, Inditex, FSC, and the Organic 100 Content Standard, ensuring a commitment to sustainability and excellence.",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/banner1.webp",
    },
    connectUsLink: "/compnay/contact-us",
  }

  return (
    <div className="bg-custom-cream">
      <ServicesSection
        image="/images/banner1.webp"
        title="Business"
        description=""
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      <div id="weaving">
        <AnimatedDetailsAndImage {...greyFabric2} imagePosition="left" />
      </div>

      <div id="trading">
        <AnimatedDetailsAndImage {...greyFabric} imagePosition="right" />
      </div>
    </div>
  )
}

export default Market
  