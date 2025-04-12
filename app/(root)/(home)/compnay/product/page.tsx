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
        paragraph: "We are committed to producing the finest premium cotton fabrics.",
      },
      {
        paragraph:
          "We stand out for our exceptional quality, specializing in fine cotton voile, cotton dobbies, and cotton slubs, all crafted from 100% pure cotton in fine counts. Our cotton fabrics range from 55 GSM to 200 GSM, offering versatility for different applications. We also offer sustainable fabrics that are BCI and GOTS certified, internationally recognized for their high environmental and ethical standards.",
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
        paragraph: "We specialize in producing the finest premium viscose fabrics.",
      },
      {
        paragraph:
          "Known for their soft, flowy texture and elegant shine, our viscose fabrics include georgettes, chiffons, tissues, organzas, and crepes, produced with intricate dobbies. We also craft high-quality viscose fabrics using Tencel Lux and Bemberg yarn. Our viscose fabrics range from 30 GSM to 300 GSM, offering versatility for different applications from scarves to apparels . Our fabrics are certified with international sustainable standards, including ECOLEVA, ECOVERO, and FSE.",
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
        paragraph: "We offer a diverse range of linen fabrics, from pure linen to high-quality blends.",
      },
      {
        paragraph:
          "Our collection includes 100% linen as well as linen blends with cotton, viscose, lyocell, and hemp. We produce linen fabrics ranging from 70 GSM to 300 GSM, ensuring suitability is met at every step. To maintain superior quality, we use premium European flax in our fabrics. Our fabrics are crafted to meet international sustainable standards.",
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
        paragraph: "Soft, luxurious, and royal, velvet is known for its rich texture and elegant appearance.",
      },
      {
        paragraph:
          "We produce high-quality micro-velvet, viscose velvet, and nylon-viscose velvet, along with Brasso velvets ( Devoré ). Our velvet fabrics range from 150 GSM to 300 GSM, offering versatility for various applications. Our fabrics are certified with international sustainable standards.",
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
        description="Established in 1952, Ruia Fabrics has evolved into a global leader in high-quality velvet and viscose fabrics. With a strong history of innovation and excellence, we produce a wide range of fabrics, including viscose/rayon velvet, synthetic velvet and cotton velvet, that cater to a variety of applications."
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
