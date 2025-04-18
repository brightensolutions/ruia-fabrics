"use client"

import ServicesSection from "@/components/ServicesSectionFn"
import Business from "@/components/business"
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
          "At Ruia Fabrics, our in-house weaving facility is equipped with 24 advanced air-jet looms, enabling the production of high-quality woven fabrics with exceptional precision and efficiency. We specialize in customized weaves and intricate patterns, ensuring innovation and adaptability across fabric designs. Complementing this, our 110 state-of-the-art velvet machines support a wide range of premium velvet offerings tailored for both apparel and home furnishing applications.",
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
          "At Ruia Fabrics, we collaborate with leading textile mills across India to support large-scale fabric manufacturing with efficiency and reliability. These strategic partnerships allow us to offer a diverse, cost-effective, and high-quality product range tailored to the needs of multiple industries. With over four decades of experience, sustainability remains central to our approach. Our partner mills uphold the highest quality and environmental standards, holding certifications such as OEKO-TEX®️, BCI, GOTS, Verified Sustainable Viscose, Inditex, FSC, and the Organic 100 Content Standard.",
      },
      
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/banner1.webp",
    },
    connectUsLink: "/compnay/contact-us",
  }

  return (
    <div>
    <Business />
  </div>
  )
}

export default Market
  