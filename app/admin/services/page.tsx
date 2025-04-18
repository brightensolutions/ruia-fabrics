"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, GripVertical, Loader2, Upload } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Service {
  _id: string
  imageUrl: string
  order: number
  active: boolean
}

interface ServiceContent {
  title: string
  paragraph1: string
  paragraph2: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [content, setContent] = useState<ServiceContent>({
    title: "",
    paragraph1: "",
    paragraph2: "",
  })
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [successMessage, setSuccessMessage] = useState("")
  const [contentSuccessMessage, setContentSuccessMessage] = useState("")
  const [savingContent, setSavingContent] = useState(false)
  const { toast } = useToast()

  // Form state for service dialog
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Fetch services and content on component mount
  useEffect(() => {
    fetchServices()
    fetchContent()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services")
      if (!response.ok) throw new Error("Failed to fetch services")

      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error("Error fetching services:", error)
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchContent = async () => {
    try {
      setContentLoading(true)
      const response = await fetch("/api/services/content")
      if (!response.ok) throw new Error("Failed to fetch service content")

      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching service content:", error)
      toast({
        title: "Error",
        description: "Failed to load service content",
        variant: "destructive",
      })
    } finally {
      setContentLoading(false)
    }
  }

  const handleAddService = () => {
    setCurrentService(null)
    setImageFile(null)
    setImagePreview(null)
    setDialogMode("create")
    setIsDialogOpen(true)
    setError("")
  }

  const handleEditService = (service: Service) => {
    setCurrentService(service)
    setImagePreview(service.imageUrl)
    setImageFile(null)
    setDialogMode("edit")
    setIsDialogOpen(true)
    setError("")
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service image?")) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete service")

      setServices(services.filter((service) => service._id !== id))
      setSuccessMessage("Service image deleted successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({
        title: "Error",
        description: "Failed to delete service image",
        variant: "destructive",
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (dialogMode === "create" && !imageFile) {
      setError("Image is required")
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()

      if (imageFile) {
        formData.append("image", imageFile)
      }

      if (dialogMode === "create") {
        // Add new service
        const response = await fetch("/api/services", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create service")
        }

        const newService = await response.json()
        setServices([...services, newService])
        setSuccessMessage("Service image added successfully!")
      } else if (dialogMode === "edit" && currentService) {
        // Update existing service
        formData.append("active", "true")

        const response = await fetch(`/api/services/${currentService._id}`, {
          method: "PUT",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to update service")

        const updatedService = await response.json()
        setServices(services.map((s) => (s._id === currentService._id ? updatedService : s)))
        setSuccessMessage("Service image updated successfully!")
      }

      setIsDialogOpen(false)
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error: any) {
      console.error("Error saving service:", error)
      setError(error.message || "Failed to save service")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(services)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately for better UX
    setServices(items)

    // Send the updated order to the server
    try {
      const response = await fetch("/api/services", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) throw new Error("Failed to update service order")

      setSuccessMessage("Service order updated successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating service order:", error)
      toast({
        title: "Error",
        description: "Failed to update service order",
        variant: "destructive",
      })
      // Revert to original order on error
      fetchServices()
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSavingContent(true)

      const response = await fetch("/api/services/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error("Failed to update service content")

      setContentSuccessMessage("Content updated successfully!")
      setTimeout(() => {
        setContentSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating service content:", error)
      toast({
        title: "Error",
        description: "Failed to update service content",
        variant: "destructive",
      })
    } finally {
      setSavingContent(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Services Section</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {/* Content Management Card */}
        <Card className="border-custom-cream mb-6 bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">What We Do Content</CardTitle>
            <CardDescription className="font-roboto">Manage the text content of your services section.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {contentLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-32 ml-auto" />
              </div>
            ) : (
              <>
                {contentSuccessMessage && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                    {contentSuccessMessage}
                  </div>
                )}
                <form onSubmit={handleContentSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-roboto">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={content.title}
                      onChange={handleContentChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paragraph1" className="font-roboto">
                      First Paragraph
                    </Label>
                    <Textarea
                      id="paragraph1"
                      name="paragraph1"
                      value={content.paragraph1}
                      onChange={handleContentChange}
                      rows={3}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paragraph2" className="font-roboto">
                      Second Paragraph
                    </Label>
                    <Textarea
                      id="paragraph2"
                      name="paragraph2"
                      value={content.paragraph2}
                      onChange={handleContentChange}
                      rows={3}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                      disabled={savingContent}
                    >
                      {savingContent ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        "Save Content"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        {/* Service Images Card */}
        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-rubik text-custom-green">What We Do Images</CardTitle>
                <CardDescription className="font-roboto">
                  Manage the images that appear in the services section. Maximum 3 images allowed. Drag to reorder.
                </CardDescription>
              </div>
              <Button
                className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                onClick={handleAddService}
                disabled={services.length >= 3}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Service Image
              </Button>
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
            ) : services.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-custom-cream rounded-md">
                <p className="text-gray-500 font-roboto">No service images found. Add your first one!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="services">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {services.map((service, index) => (
                        <Draggable key={service._id} draggableId={service._id} index={index}>
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
                                  src={service.imageUrl || "/placeholder.svg"}
                                  alt="Service image"
                                  className="h-40 w-full md:h-20 md:w-32 object-cover rounded-md"
                                />
                                <div>
                                  <p className="text-sm text-gray-500 font-roboto">Order: {index + 1}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                                  onClick={() => handleEditService(service)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDeleteService(service._id)}
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

      {/* Service Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-rubik text-custom-green">
              {dialogMode === "create" ? "Add New Service Image" : "Edit Service Image"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitService} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="image" className="font-roboto">
                Service Image
              </Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                </Button>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <span className="text-sm text-gray-500 font-roboto">
                  {imageFile ? imageFile.name : "No file selected"}
                </span>
              </div>
            </div>

            {imagePreview && (
              <div className="mt-4 border border-custom-cream rounded-md overflow-hidden">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="font-roboto border-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto ml-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {dialogMode === "create" ? "Adding..." : "Saving..."}
                  </>
                ) : dialogMode === "create" ? (
                  "Add Service"
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
