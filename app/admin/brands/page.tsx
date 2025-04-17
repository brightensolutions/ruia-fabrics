"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react"
import { BrandFormDialog } from "@/components/brand-form-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useToast } from "@/hooks/use-toast"
import { MarqueeDemo } from "@/components/rotating-logo-carousel-3d"

interface Brand {
  _id: string
  image: string
  order: number
  active: boolean
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [successMessage, setSuccessMessage] = useState("")
  const { toast } = useToast()

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/brands")
      if (!response.ok) throw new Error("Failed to fetch brands")

      const data = await response.json()
      // Sort by order field to ensure correct display
      data.sort((a: Brand, b: Brand) => a.order - b.order)
      setBrands(data)
    } catch (error) {
      console.error("Error fetching brands:", error)
      toast({
        title: "Error",
        description: "Failed to load brand logos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddBrand = () => {
    setCurrentBrand(null)
    setDialogMode("create")
    setIsDialogOpen(true)
  }

  const handleEditBrand = (brand: Brand) => {
    setCurrentBrand(brand)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  const handleDeleteBrand = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand logo?")) return

    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete brand")

      setBrands(brands.filter((brand) => brand._id !== id))
      setSuccessMessage("Brand logo deleted successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error deleting brand:", error)
      toast({
        title: "Error",
        description: "Failed to delete brand logo",
        variant: "destructive",
      })
    }
  }

  const handleToggleActive = async (brand: Brand) => {
    try {
      const formData = new FormData()
      formData.append("active", String(!brand.active))

      const response = await fetch(`/api/brands/${brand._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to update brand")

      const updatedBrand = await response.json()
      setBrands(brands.map((b) => (b._id === brand._id ? updatedBrand : b)))

      toast({
        title: "Success",
        description: `Brand ${updatedBrand.active ? "activated" : "deactivated"} successfully`,
      })
    } catch (error) {
      console.error("Error toggling brand active state:", error)
      toast({
        title: "Error",
        description: "Failed to update brand status",
        variant: "destructive",
      })
    }
  }

  const handleSubmitBrand = async (formData: FormData) => {
    try {
      if (dialogMode === "create") {
        // Add new brand
        const response = await fetch("/api/brands", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to create brand")

        const newBrand = await response.json()
        setBrands([...brands, newBrand])
        setSuccessMessage("Brand logo added successfully!")
      } else if (dialogMode === "edit" && currentBrand) {
        // Update existing brand
        const response = await fetch(`/api/brands/${currentBrand._id}`, {
          method: "PUT",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to update brand")

        const updatedBrand = await response.json()
        setBrands(brands.map((b) => (b._id === currentBrand._id ? updatedBrand : b)))
        setSuccessMessage("Brand logo updated successfully!")
      }

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving brand:", error)
      toast({
        title: "Error",
        description: "Failed to save brand logo",
        variant: "destructive",
      })
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(brands)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately for better UX
    setBrands(items)

    // Send the updated order to the server
    try {
      const response = await fetch("/api/brands", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) throw new Error("Failed to update brand order")

      setSuccessMessage("Brand order updated successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating brand order:", error)
      toast({
        title: "Error",
        description: "Failed to update brand order",
        variant: "destructive",
      })
      // Revert to original order on error
      fetchBrands()
    }
  }

  // Function to fix all brand orders
  const fixBrandOrders = async () => {
    try {
      // Create a copy of brands and ensure they have sequential order values
      const orderedBrands = [...brands].map((brand, index) => ({
        ...brand,
        order: index,
      }))

      const response = await fetch("/api/brands", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: orderedBrands }),
      })

      if (!response.ok) throw new Error("Failed to fix brand orders")

      setSuccessMessage("Brand orders fixed successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)

      // Refresh brands
      fetchBrands()
    } catch (error) {
      console.error("Error fixing brand orders:", error)
      toast({
        title: "Error",
        description: "Failed to fix brand orders",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="overflow-hidden ">
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Brand Logos</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}
        <Card className="border-custom-cream">
          <CardHeader className="bg-custom-cream">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-rubik text-custom-green">Brand Logos</CardTitle>
                <CardDescription className="font-roboto">
                  Manage the brand logos that appear in the marquee. Drag to reorder.
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-roboto" onClick={fixBrandOrders}>
                  Fix Orders
                </Button>
                <Button
                  className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                  onClick={handleAddBrand}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Brand Logo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            {loading ? (
              // Loading skeletons
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center border border-custom-cream p-4 rounded-md">
                    <Skeleton className="h-20 w-32 rounded-md" />
                    <div className="ml-4 flex-1">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-20 rounded-md" />
                      <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : brands.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-custom-cream rounded-md">
                <p className="text-gray-500 font-roboto">No brand logos found. Add your first one!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="brands">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {brands.map((brand, index) => (
                        <Draggable key={brand._id} draggableId={brand._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex flex-col md:flex-row md:items-center justify-between border border-custom-cream p-4 rounded-md bg-white ${
                                !brand.active ? "opacity-60" : ""
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab p-2 text-gray-400 hover:text-custom-green"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <img
                                  src={brand.image || "/placeholder.svg"}
                                  alt="Brand logo"
                                  className="h-20 w-full bg-custom-green md:h-20 md:w-32 object-contain rounded-md"
                                />
                              </div>
                              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`border-${brand.active ? "amber-500" : "green-500"} text-${
                                    brand.active ? "amber-500 text-black" : "green-500 text-red-500"
                                  } `}
                                  onClick={() => handleToggleActive(brand)}
                                >
                                  {brand.active ? (
                                    <>
                                      <EyeOff className="h-4 w-4 mr-2 text-custome-green" /> Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2 text-custome-green" /> Activate
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                                  onClick={() => handleEditBrand(brand)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDeleteBrand(brand._id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </main>

      <BrandFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitBrand}
        initialData={
          currentBrand
            ? {
                id: currentBrand._id,
                image: currentBrand.image,
                active: currentBrand.active,
              }
            : undefined
        }
        mode={dialogMode}
      />
    </div>
  )
}
