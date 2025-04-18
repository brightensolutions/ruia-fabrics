"use client"
import { useEffect } from "react"
import Products from "@/components/products"

const Product = () => {
  // This effect runs once when the page loads to handle direct navigation with hash
  useEffect(() => {
    // If there's a hash in the URL when directly navigating to this page
    if (window.location.hash) {
      // We need to manually trigger a hashchange event after a short delay
      // This ensures the Products component's hash change handler runs after it's mounted
      setTimeout(() => {
        // Create and dispatch a new hashchange event
        const hashChangeEvent = new Event("hashchange")
        window.dispatchEvent(hashChangeEvent)
      }, 500)
    }
  }, [])

  return (
    <div>
      <Products />
    </div>
  )
}

export default Product
