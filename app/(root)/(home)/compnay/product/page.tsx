"use client"

import { useEffect } from "react"
import ServicesSection from "@/components/ServicesSectionFn"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"

const Product = () => {
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

  const greyFabric = {
    title: "Cotton Fabric",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "We are dedicated to crafting premium-quality cotton fabrics with precision and care. Our expertise lies in producing fine Cotton Voile, Cotton Dobbies, and Cotton Slubs—each made from 100% pure cotton in fine counts. With a weight range from 55 GSM to 200 GSM, our fabrics offer versatility for a wide variety of applications. Committed to sustainability, we also provide BCI and GOTS certified fabrics that meet globally recognised environmental and ethical standards.",
      },
    ],
    paragraphColor: "text-gray-700",
    images: {
      main: "/fabric/cotton 2.jpg",
    },
    connectUsLink: "/compnay/contact-us",
    sectioncolor: "bg-gradient-to-t to-creamwhite from-white",
  }

  const velvetFabric = {
    title: "Viscose Fabric",
    titleColor: "text-white",
    details: [
      {
        paragraph:
          "We specialize in premium viscose fabrics known for their luxurious drape, soft texture, and elegant sheen. Our collection includes Georgettes, Chiffons, Tissues, Organzas, and Crepes—many crafted with intricate dobbies for added character. We also produce high-quality viscose fabrics using advanced fibers like Tencel Luxe and Bemberg yarn. With a GSM range of 30 to 300, our viscose fabrics are suitable for a wide array of applications, from delicate scarves to sophisticated apparel. All our viscose offerings are certified by globally recognized sustainability standards, including ECOLIVA, ECOVERO, and FSE.",
      },
    ],
    paragraphColor: "text-white/85",
    images: {
      main: "/fabric/viscose.jpg",
      overlay: "/fabric/viscose 1.webp",
    },
    connectUsLink: "/compnay/contact-us",
    bgcolor: "bg-custom-green",
    btncolor: "bg-custom-black",
  }

  const YarnFabric = {
    title: "Linen ",
    details: [
      {
        paragraph:
          "Ruia Fabrics offers a versatile range of linen fabrics, from pure linen to premium blends tailored for performance and style. Our collection features 100% linen as well as blends with Cotton, Viscose, Lyocell, and Hemp, catering to a wide spectrum of design and functional needs. With fabric weights ranging from 70 GSM to 300 GSM, our linens are crafted for diverse applications. We use premium European flax to ensure superior quality and durability, and our linen fabrics adhere to internationally recognized sustainability standards.",
      },
    ],
    paragraphColor: "text-textblak",
    images: {
      main: "/fabric/linen 2.jpg",
      overlay: "/fabric/linen .jpg",
    },
    connectUsLink: "/compnay/contact-us",
  }

  const velvetFabric2 = {
    title: "Velvet ",
    titleColor: "text-black",
    details: [
      {
        paragraph:
          "Renowned for its soft touch and regal elegance, is a hallmark of luxury—and at Ruia Fabrics, we craft it to perfection. Our offerings include high-quality Micro-Velvet, Viscose Velvet, Nylon-Viscose Belvet, and Brasso (Devoré) velvets, all designed to deliver exceptional texture and visual appeal. With a GSM range of 150 to 300, our velvet fabrics are tailored for diverse applications across fashion and interior design. Each fabric is produced in accordance with internationally recognized sustainability standards, ensuring both beauty and responsibility.",
      },
    ],
    paragraphColor: "text-black",
    images: {
      main: "/fabric/velvet .jpeg.jpg",
      overlay: "/fabric/velevet 2.jpg",
    },
    connectUsLink: "/compnay/contact-us",
    bgcolor: "bg-custom-cream/50",
    btncolor: "bg-custom-black",
  }

  return (
    <div>
      <ServicesSection
        image="/company/014A7572.JPG"
        title="Our Products"
        description="Ruia Fabrics has grown into a global leader in high-quality Linen, Velvet and Viscose fabrics. With a longstanding commitment to innovation and excellence, we offer a diverse range of fabrics—including Viscose/Rayon Velvet, synthetic Velvet, and Cotton Velvet—designed to meet the needs of various applications across industries."
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      {/* Add id attributes to each section for navigation */}
      <div id="cotton" className="bg-gradient-to-t to-creamwhite pt-[45px] from-white">
        <AnimatedDetailsAndImage {...greyFabric} imagePosition="left" />
      </div>

      <div id="viscose">
        <AnimatedDetailsAndImage {...velvetFabric} imagePosition="right" />
      </div>

      <div id="linen">
        <AnimatedDetailsAndImage {...YarnFabric} imagePosition="left" />
      </div>

      <div id="velvet">
        <AnimatedDetailsAndImage {...velvetFabric2} imagePosition="right" />
      </div>
    </div>
  )
}

export default Product
