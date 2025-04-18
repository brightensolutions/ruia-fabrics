"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Search, MoveUp, MoveDown } from "lucide-react"
import ProductFormDialog from "@/components/product-form-dialog"
import ProductSectionForm from "@/components/product-section-form"

// Define the Product interface to match your model
interface Product {
  _id: string
  title: string
  titleColor: string
  description: string
  paragraphColor: string
  mainImage: string
  overlayImage?: string
  blobMainUrl?: string
  blobOverlayUrl?: string
  imagePosition: "left" | "right"
  connectUsLink: string
  bgcolor: string
  sectioncolor?: string
  btncolor: string
  order: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id))
        setSuccessMessage("Product deleted successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product. Please try again.")
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return

    try {
      const updatedProducts = [...products]
      const currentProduct = updatedProducts[index]
      const prevProduct = updatedProducts[index - 1]

      // Swap orders
      const tempOrder = currentProduct.order
      currentProduct.order = prevProduct.order
      prevProduct.order = tempOrder

      // Update in database
      await Promise.all([
        fetch(`/api/products/${currentProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentProduct),
        }),
        fetch(`/api/products/${prevProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prevProduct),
        }),
      ])

      // Swap in array
      updatedProducts[index] = prevProduct
      updatedProducts[index - 1] = currentProduct

      setProducts(updatedProducts)
      setSuccessMessage("Product order updated!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating product order:", error)
      alert("Failed to update product order. Please try again.")
    }
  }

  const handleMoveDown = async (index: number) => {
    if (index === products.length - 1) return

    try {
      const updatedProducts = [...products]
      const currentProduct = updatedProducts[index]
      const nextProduct = updatedProducts[index + 1]

      // Swap orders
      const tempOrder = currentProduct.order
      currentProduct.order = nextProduct.order
      nextProduct.order = tempOrder

      // Update in database
      await Promise.all([
        fetch(`/api/products/${currentProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentProduct),
        }),
        fetch(`/api/products/${nextProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextProduct),
        }),
      ])

      // Swap in array
      updatedProducts[index] = nextProduct
      updatedProducts[index + 1] = currentProduct

      setProducts(updatedProducts)
      setSuccessMessage("Product order updated!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating product order:", error)
      alert("Failed to update product order. Please try again.")
    }
  }

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Products</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        <Tabs defaultValue="products">
          <TabsList className="mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="section">Section Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="border-custom-cream">
              <CardHeader className="bg-custom-cream/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-rubik text-custom-green">Products</CardTitle>
                    <CardDescription className="font-roboto">Manage your product catalog.</CardDescription>
                  </div>
                  <ProductFormDialog onSuccess={fetchProducts} />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8 font-roboto border-custom-cream"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? "No products match your search." : "No products found. Add your first product!"}
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product, index) => (
                      <div key={product._id} className="border border-custom-cream rounded-md overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={product.mainImage || "/placeholder.svg?height=300&width=500&query=product"}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                          {product.overlayImage && (
                            <div className="absolute bottom-2 right-2 w-1/3 h-1/3">
                              <img
                                src={product.overlayImage || "/placeholder.svg?height=100&width=100&query=overlay"}
                                alt={`${product.title} overlay`}
                                className="w-full h-full object-cover border-2 border-white rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium font-rubik text-custom-green">{product.title}</h3>
                          <p className="text-sm text-gray-500 font-roboto mt-1 line-clamp-2">{product.description}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                              >
                                <MoveUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === filteredProducts.length - 1}
                              >
                                <MoveDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex space-x-2">
                              <ProductFormDialog isEdit product={product} onSuccess={fetchProducts} />
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => handleDelete(product._id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="section">
            <ProductSectionForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
