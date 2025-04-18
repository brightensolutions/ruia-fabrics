"use client"
import { useState, useEffect } from "react"
import ServicesSection from "@/components/ServicesSectionFn"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"

interface Product {
  _id: string
  title: string
  titleColor: string
  description: string
  paragraphColor: string
  mainImage: string
  overlayImage?: string
  bgcolor?: string
  sectionColor?: string
  buttonColor?: string
  order: number
}

interface ProductSection {
  title: string
  description: string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [section, setSection] = useState<ProductSection>({
    title: "Our Products",
    description:
      "Ruia Fabrics has grown into a global leader in high-quality Linen, Velvet and Viscose fabrics. With a longstanding commitment to innovation and excellence, we offer a diverse range of fabrics designed to meet the needs of various applications across industries.",
  })
  const [loading, setLoading] = useState(true)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, sectionResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/product-section"),
        ])

        if (productsResponse.ok) {
          const data = await productsResponse.json()
          // Sort products by order
          const sortedProducts = data.sort((a: Product, b: Product) => a.order - b.order)
          setProducts(sortedProducts)
        }

        if (sectionResponse.ok) {
          const sectionData = await sectionResponse.json()
          if (sectionData) {
            setSection(sectionData)
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Handle hash navigation - both on initial load and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash && !loading) {
        const id = window.location.hash.substring(1) // Remove the # character
        scrollToSection(id)
      }
    }

    // Handle initial hash on page load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [loading, products]) // Re-run when products are loaded

  // Function to scroll to a specific section
  const scrollToSection = (id: string) => {
    // Try to find element by ID
    const element = document.getElementById(id)

    if (element) {
      // Add a slight delay to ensure the page is fully rendered
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
      </div>
    )
  }

  return (
    <div>
      <ServicesSection
        image="/company/014A7572.JPG"
        title={section.title}
        description={section.description}
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      {products.map((product, index) => {
        // Create a consistent ID for each product section
        const productId = product.title.toLowerCase().replace(/\s+/g, "-")

        // Convert product data to AnimatedDetailsAndImage props
        const productProps = {
          title: product.title,
          titleColor: product.titleColor ,
          details: [{ paragraph: product.description }],
          paragraphColor: product.paragraphColor ,
          images: {
            main: product.mainImage,
            overlay: product.overlayImage,
          },
          connectUsLink: "/compnay/contact-us",
          bgcolor: product.bgcolor,
          sectioncolor: product.sectionColor,
          btncolor: product.buttonColor ,
        }

        return (
          <div id={productId} key={product._id} className={index === 0 ? "pt-[45px]" : ""}>
            <AnimatedDetailsAndImage {...productProps} imagePosition={index % 2 === 0 ? "left" : "right"} />
          </div>
        )
      })}
    </div>
  )
}

export default Products
