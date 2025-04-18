"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, GripVertical, Loader2, Upload, Eye, EyeOff } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface SustainableFabric {
  _id: string
  name: string
  description: string
  image: string
  icon: string
  order: number
  active: boolean
}

interface SustainableContent {
  title: string
  quote: string
  description: string
}

export default function SustainableFabricsPage() {
  const [fabrics, setFabrics] = useState<SustainableFabric[]>([])
  const [content, setContent] = useState<SustainableContent>({
    title: "",
    quote: "",
    description: "",
  })
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFabric, setCurrentFabric] = useState<SustainableFabric | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [successMessage, setSuccessMessage] = useState("")
  const [contentSuccessMessage, setContentSuccessMessage] = useState("")
  const [savingContent, setSavingContent] = useState(false)
  const { toast } = useToast()

  // Form state for fabric dialog
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [active, setActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Fetch fabrics and content on component mount
  useEffect(() => {
    fetchFabrics()
    fetchContent()
  }, [])

  const fetchFabrics = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/sustainable-fabrics")
      if (!response.ok) throw new Error("Failed to fetch sustainable fabrics")

      const data = await response.json()
      // Sort by order field to ensure correct display
      data.sort((a: SustainableFabric, b: SustainableFabric) => a.order - b.order)
      setFabrics(data)
    } catch (error) {
      console.error("Error fetching sustainable fabrics:", error)
      toast({
        title: "Error",
        description: "Failed to load sustainable fabrics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchContent = async () => {
    try {
      setContentLoading(true)
      const response = await fetch("/api/sustainable-content")
      if (!response.ok) throw new Error("Failed to fetch sustainable content")

      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching sustainable content:", error)
      toast({
        title: "Error",
        description: "Failed to load sustainable content",
        variant: "destructive",
      })
    } finally {
      setContentLoading(false)
    }
  }

  const handleAddFabric = () => {
    setCurrentFabric(null)
    setName("")
    setDescription("")
    setImageFile(null)
    setIconFile(null)
    setImagePreview(null)
    setIconPreview(null)
    setActive(true)
    setDialogMode("create")
    setIsDialogOpen(true)
    setError("")
  }

  const handleEditFabric = (fabric: SustainableFabric) => {
    setCurrentFabric(fabric)
    setName(fabric.name)
    setDescription(fabric.description)
    setImagePreview(fabric.image)
    setIconPreview(fabric.icon)
    setActive(fabric.active !== false)
    setImageFile(null)
    setIconFile(null)
    setDialogMode("edit")
    setIsDialogOpen(true)
    setError("")
  }

  const handleDeleteFabric = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sustainable fabric?")) return

    try {
      const response = await fetch(`/api/sustainable-fabrics/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete sustainable fabric")

      setFabrics(fabrics.filter((fabric) => fabric._id !== id))
      setSuccessMessage("Sustainable fabric deleted successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error deleting sustainable fabric:", error)
      toast({
        title: "Error",
        description: "Failed to delete sustainable fabric",
        variant: "destructive",
      })
    }
  }

  const handleToggleActive = async (fabric: SustainableFabric) => {
    try {
      const formData = new FormData()
      formData.append("name", fabric.name)
      formData.append("description", fabric.description)
      formData.append("active", String(!fabric.active))

      const response = await fetch(`/api/sustainable-fabrics/${fabric._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to update sustainable fabric")

      const updatedFabric = await response.json()
      setFabrics(fabrics.map((f) => (f._id === fabric._id ? updatedFabric : f)))

      toast({
        title: "Success",
        description: `Fabric ${updatedFabric.active ? "activated" : "deactivated"} successfully`,
      })
    } catch (error) {
      console.error("Error toggling fabric active state:", error)
      toast({
        title: "Error",
        description: "Failed to update fabric status",
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

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitFabric = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!description.trim()) {
      setError("Description is required")
      return
    }

    if (dialogMode === "create") {
      if (!imageFile) {
        setError("Image is required")
        return
      }

      if (!iconFile) {
        setError("Icon is required")
        return
      }
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("active", String(active))

      if (imageFile) {
        formData.append("image", imageFile)
      }

      if (iconFile) {
        formData.append("icon", iconFile)
      }

      if (dialogMode === "create") {
        // Add new fabric
        const response = await fetch("/api/sustainable-fabrics", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create sustainable fabric")
        }

        const newFabric = await response.json()
        setFabrics([...fabrics, newFabric])
        setSuccessMessage("Sustainable fabric added successfully!")
      } else if (dialogMode === "edit" && currentFabric) {
        // Update existing fabric
        const response = await fetch(`/api/sustainable-fabrics/${currentFabric._id}`, {
          method: "PUT",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to update sustainable fabric")

        const updatedFabric = await response.json()
        setFabrics(fabrics.map((f) => (f._id === currentFabric._id ? updatedFabric : f)))
        setSuccessMessage("Sustainable fabric updated successfully!")
      }

      setIsDialogOpen(false)
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error: any) {
      console.error("Error saving sustainable fabric:", error)
      setError(error.message || "Failed to save sustainable fabric")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(fabrics)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update local state immediately for better UX
    setFabrics(items)

    // Send the updated order to the server
    try {
      const response = await fetch("/api/sustainable-fabrics", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) throw new Error("Failed to update fabric order")

      setSuccessMessage("Fabric order updated successfully!")
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating fabric order:", error)
      toast({
        title: "Error",
        description: "Failed to update fabric order",
        variant: "destructive",
      })
      // Revert to original order on error
      fetchFabrics()
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

      const response = await fetch("/api/sustainable-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error("Failed to update sustainable content")

      setContentSuccessMessage("Content updated successfully!")
      setTimeout(() => {
        setContentSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error updating sustainable content:", error)
      toast({
        title: "Error",
        description: "Failed to update sustainable content",
        variant: "destructive",
      })
    } finally {
      setSavingContent(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Sustainable Fabrics</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {/* Content Management Card */}
        <Card className="border-custom-cream mb-6 bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">Sustainable Content</CardTitle>
            <CardDescription className="font-roboto">
              Manage the text content of your sustainable fabrics section.
            </CardDescription>
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
                    <Label htmlFor="quote" className="font-roboto">
                      Quote
                    </Label>
                    <Textarea
                      id="quote"
                      name="quote"
                      value={content.quote}
                      onChange={handleContentChange}
                      rows={3}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-roboto">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={content.description}
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

        {/* Sustainable Fabrics Card */}
        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-rubik text-custom-green">Sustainable Fabrics</CardTitle>
                <CardDescription className="font-roboto">
                  Manage the sustainable fabrics that appear on your website. Drag to reorder.
                </CardDescription>
              </div>
              <Button
                className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
                onClick={handleAddFabric}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Fabric
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              // Loading skeletons
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center border border-custom-cream p-4 rounded-md">
                    <Skeleton className="h-20 w-20 rounded-full mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-20 rounded-md" />
                      <Skeleton className="h-9 w-20 rounded-md" />
                      <Skeleton className="h-9 w-20 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : fabrics.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-custom-cream rounded-md">
                <p className="text-gray-500 font-roboto">No sustainable fabrics found. Add your first one!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fabrics">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {fabrics.map((fabric, index) => (
                        <Draggable key={fabric._id} draggableId={fabric._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex flex-col md:flex-row md:items-center justify-between border border-custom-cream p-4 rounded-md bg-white ${
                                !fabric.active ? "opacity-60" : ""
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab p-2 text-gray-400 hover:text-custom-green"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="flex items-center">
                                  <div className="w-16 h-16 relative mr-4 border border-custom-cream rounded-md overflow-hidden">
                                    <img
                                      src={fabric.icon || "/placeholder.svg"}
                                      alt={`${fabric.name} icon`}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium font-rubik text-custom-green">{fabric.name}</h3>
                                    <p className="text-sm text-gray-500 font-roboto">Order: {index + 1}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`border-${fabric.active ? "amber-500" : "green-500"} text-${
                                    fabric.active ? "amber-500 text-black" : "green-500 text-red-500"
                                  } `}
                                  onClick={() => handleToggleActive(fabric)}
                                >
                                  {fabric.active ? (
                                    <>
                                      <EyeOff className="h-4 w-4 mr-2" /> Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2" /> Activate
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                                  onClick={() => handleEditFabric(fabric)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleDeleteFabric(fabric._id)}
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

      {/* Fabric Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-rubik text-custom-green">
              {dialogMode === "create" ? "Add New Sustainable Fabric" : "Edit Sustainable Fabric"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitFabric} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="font-roboto">
                Fabric Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-roboto border-custom-cream"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-roboto">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="font-roboto border-custom-cream"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="font-roboto">
                Fabric Image
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
                  {imageFile ? imageFile.name : imagePreview ? "Current image" : "No file selected"}
                </span>
              </div>
            </div>

            {imagePreview && (
              <div className="mt-4 border border-custom-cream rounded-md overflow-hidden">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="icon" className="font-roboto">
                Fabric Icon
              </Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("icon-upload")?.click()}
                  className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {iconPreview ? "Change Icon" : "Upload Icon"}
                </Button>
                <Input id="icon-upload" type="file" accept="image/*" onChange={handleIconChange} className="hidden" />
                <span className="text-sm text-gray-500 font-roboto">
                  {iconFile ? iconFile.name : iconPreview ? "Current icon" : "No file selected"}
                </span>
              </div>
            </div>

            {iconPreview && (
              <div className="mt-4 border border-custom-cream rounded-md overflow-hidden p-4 flex justify-center">
                <img src={iconPreview || "/placeholder.svg"} alt="Icon Preview" className="h-16 w-16 object-contain" />
              </div>
            )}

            {dialogMode === "edit" && (
              <div className="flex items-center space-x-2">
                <Switch id="active" checked={active} onCheckedChange={setActive} />
                <Label htmlFor="active" className="font-roboto">
                  Active
                </Label>
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
                  "Add Fabric"
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
