"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"
import { SliderFormDialog } from "@/components/slider-form-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useToast } from "@/hooks/use-toast"

interface Slider {
  _id: string
  title: string
  image: string
  order: number
}

export default function SliderPage() {
  const [sliders, setSliders] = useState<Slider[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentSlider, setCurrentSlider] = useState<Slider | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [successMessage, setSuccessMessage] = useState("")
  const { toast } = useToast()

  // Fetch sliders on component mount
  useEffect(() => {
    fetchSliders()
  }, [])

  const fetchSliders = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/sliders")
      if (!response.ok) throw new Error("Failed to fetch sliders")

      const data = await response.json()
      // Sort by order field to ensure correct display
      data.sort((a: Slider, b: Slider) => a.order - b.order)
      setSliders(data)
    } catch (error) {
      console.error("Error fetching sliders:", error)
      toast({
        title: "Error",
        description: "Failed to load slider images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddSlider = () => {
    setCurrentSlider(null)
    setDialogMode("create")
    setIsDialogOpen(true)
  }

  const handleEditSlider = (slider: Slider) => {
    setCurrentSlider(slider)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  const handleDeleteSlider = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slider image?")) return

    try {
      const response = await fetch(`/api/sliders/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete slider")

      setSliders(sliders.filter((slider) => slider._id !== id))
      setSuccessMessage("Slider image deleted successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error deleting slider:", error)
      toast({
        title: "Error",
        description: "Failed to delete slider image",
        variant: "destructive",
      })
    }
  }

  const handleSubmitSlider = async (formData: FormData) => {
    try {
      if (dialogMode === "create") {
        // Add new slider
        const response = await fetch("/api/sliders", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to create slider")

        const newSlider = await response.json()
        setSliders([...sliders, newSlider])
        setSuccessMessage("Slider image added successfully!")
      } else if (dialogMode === "edit" && currentSlider) {
        // Update existing slider
        const response = await fetch(`/api/sliders/${currentSlider._id}`, {
          method: "PUT",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to update slider")

        const updatedSlider = await response.json()
        setSliders(sliders.map((s) => (s._id === currentSlider._id ? updatedSlider : s)))
        setSuccessMessage("Slider image updated successfully!")
      }

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving slider:", error)
      toast({
        title: "Error",
        description: "Failed to save slider image",
        variant: "destructive",
      })
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(sliders)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately for better UX
    setSliders(items)

    // Send the updated order to the server
    try {
      const response = await fetch("/api/sliders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) throw new Error("Failed to update slider order")

      setSuccessMessage("Slider order updated successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating slider order:", error)
      toast({
        title: "Error",
        description: "Failed to update slider order",
        variant: "destructive",
      })
      // Revert to original order on error
      fetchSliders()
    }
  }

  // Function to fix all slider orders
  const fixSliderOrders = async () => {
    try {
      // Create a copy of sliders and ensure they have sequential order values
      const orderedSliders = [...sliders].map((slider, index) => ({
        ...slider,
        order: index,
      }))

      const response = await fetch("/api/sliders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: orderedSliders }),
      })

      if (!response.ok) throw new Error("Failed to fix slider orders")

      setSuccessMessage("Slider orders fixed successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)

      // Refresh sliders
      fetchSliders()
    } catch (error) {
      console.error("Error fixing slider orders:", error)
      toast({
        title: "Error",
        description: "Failed to fix slider orders",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Slider Images</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-rubik text-custom-green">Slider Images</CardTitle>
                <CardDescription className="font-roboto">
                  Manage the images that appear in the homepage slider. Drag to reorder.
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-roboto" onClick={fixSliderOrders}>
                  Fix Orders
                </Button>
                <Button
                  className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                  onClick={handleAddSlider}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Slider Image
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
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
            ) : sliders.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-custom-cream rounded-md">
                <p className="text-gray-500 font-roboto">No slider images found. Add your first one!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sliders">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {sliders.map((slider, index) => (
                        <Draggable key={slider._id} draggableId={slider._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex flex-col md:flex-row md:items-center justify-between border border-custom-cream p-4 rounded-md bg-white"
                            >
                              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab p-2 text-gray-400 hover:text-custom-green"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <img
                                  src={slider.image || "/placeholder.svg"}
                                  alt={slider.title}
                                  className="h-40 w-full md:h-20 md:w-32 object-cover rounded-md"
                                />
                                <div>
                                  <h3 className="font-medium font-rubik text-custom-green">{slider.title}</h3>
                                  
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                                  onClick={() => handleEditSlider(slider)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDeleteSlider(slider._id)}
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

      <SliderFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitSlider}
        initialData={
          currentSlider
            ? {
                id: currentSlider._id,
                title: currentSlider.title,
                image: currentSlider.image,
              }
            : undefined
        }
        mode={dialogMode}
      />
    </>
  )
}
