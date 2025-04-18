"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Search, MoveUp, MoveDown } from "lucide-react"
import BusinessFormDialog from "@/components/business-form-dialog"
import BusinessSectionForm from "@/components/business-section-form"

// Define the Business type to fix the TypeScript error
interface Business {
  _id: string
  title: string
  description: string
  mainImage?: string
  overlayImage?: string
  order: number
  titleColor?: string
  paragraphColor?: string
  imagePosition?: string
  sectionId?: string
  bgcolor?: string
  sectioncolor?: string
  btncolor?: string
}

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/business")
      if (response.ok) {
        const data = await response.json()
        setBusinesses(data)
      }
    } catch (error) {
      console.error("Error fetching businesses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business item?")) {
      return
    }

    try {
      const response = await fetch(`/api/business/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBusinesses(businesses.filter((business) => business._id !== id))
        setSuccessMessage("Business item deleted successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        throw new Error("Failed to delete business item")
      }
    } catch (error) {
      console.error("Error deleting business item:", error)
      alert("Failed to delete business item. Please try again.")
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return

    try {
      const updatedBusinesses = [...businesses]
      const currentBusiness = updatedBusinesses[index]
      const prevBusiness = updatedBusinesses[index - 1]

      // Swap orders
      const tempOrder = currentBusiness.order
      currentBusiness.order = prevBusiness.order
      prevBusiness.order = tempOrder

      // Update in database
      await Promise.all([
        fetch(`/api/business/${currentBusiness._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentBusiness),
        }),
        fetch(`/api/business/${prevBusiness._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prevBusiness),
        }),
      ])

      // Swap in array
      updatedBusinesses[index] = prevBusiness
      updatedBusinesses[index - 1] = currentBusiness

      setBusinesses(updatedBusinesses)
      setSuccessMessage("Business item order updated!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating business item order:", error)
      alert("Failed to update business item order. Please try again.")
    }
  }

  const handleMoveDown = async (index: number) => {
    if (index === businesses.length - 1) return

    try {
      const updatedBusinesses = [...businesses]
      const currentBusiness = updatedBusinesses[index]
      const nextBusiness = updatedBusinesses[index + 1]

      // Swap orders
      const tempOrder = currentBusiness.order
      currentBusiness.order = nextBusiness.order
      nextBusiness.order = tempOrder

      // Update in database
      await Promise.all([
        fetch(`/api/business/${currentBusiness._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentBusiness),
        }),
        fetch(`/api/business/${nextBusiness._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextBusiness),
        }),
      ])

      // Swap in array
      updatedBusinesses[index] = nextBusiness
      updatedBusinesses[index + 1] = currentBusiness

      setBusinesses(updatedBusinesses)
      setSuccessMessage("Business item order updated!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating business item order:", error)
      alert("Failed to update business item order. Please try again.")
    }
  }

  const filteredBusinesses = businesses.filter((business) =>
    business.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Business</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        <Tabs defaultValue="businesses">
          <TabsList className="mb-4">
            <TabsTrigger value="businesses">Business Items</TabsTrigger>
            <TabsTrigger value="section">Section Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses">
            <Card className="border-custom-cream">
              <CardHeader className="bg-custom-cream/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-rubik text-custom-green">Business Items</CardTitle>
                    <CardDescription className="font-roboto">
                      Manage your business items like Weaving and Trading.
                    </CardDescription>
                  </div>
                  <BusinessFormDialog onSuccess={fetchBusinesses} />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search business items..."
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
                ) : filteredBusinesses.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm
                      ? "No business items match your search."
                      : "No business items found. Add your first business item!"}
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBusinesses.map((business, index) => (
                      <div key={business._id} className="border border-custom-cream rounded-md overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={business.mainImage || "/placeholder.svg?height=240&width=320&query=business"}
                            alt={business.title}
                            className="w-full h-full object-cover"
                          />
                          {business.overlayImage && (
                            <div className="absolute bottom-2 right-2 w-1/3 h-1/3">
                              <img
                                src={business.overlayImage || "/placeholder.svg"}
                                alt={`${business.title} overlay`}
                                className="w-full h-full object-cover border-2 border-white rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium font-rubik text-custom-green">{business.title}</h3>
                          <p className="text-sm text-gray-500 font-roboto mt-1 line-clamp-2">{business.description}</p>
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
                                disabled={index === filteredBusinesses.length - 1}
                              >
                                <MoveDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex space-x-2">
                              <BusinessFormDialog isEdit business={business} onSuccess={fetchBusinesses} />
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => handleDelete(business._id)}
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
            <BusinessSectionForm />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
