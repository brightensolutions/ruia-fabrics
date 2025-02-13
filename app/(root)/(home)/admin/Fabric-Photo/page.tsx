"use client"
import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface FabricPhoto {
  _id: string
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}

export default function FabricPage() {
  const [images, setImages] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fabricPhotos, setFabricPhotos] = useState<FabricPhoto[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFabricPhotos()
  }, [])

  const fetchFabricPhotos = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/get-fabric-photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch fabric photos")
      }

      const data = await response.json()
      setFabricPhotos(data.photos)
    } catch (error) {
      console.error("Error fetching fabric photos:", error)
      toast.error("Failed to load fabric photos. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter((file) => file.type.startsWith("image/"))
      setImages((prev) => [...prev, ...newImages].slice(0, 6))
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleImageUpload(e.dataTransfer.files)
    },
    [handleImageUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      images.forEach((image, index) => {
        formData.append(`images`, image)
      })

      const response = await fetch("/api/upload-fabric-photos", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload images")
      }

      toast.success("Images uploaded successfully!", { autoClose: 3000 })
      fetchFabricPhotos() // Refresh the fabric photos after upload
      setIsDialogOpen(false) // Close the dialog after successful upload
    } catch (error) {
      console.error("Error uploading images:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload images. Please try again.", {
        autoClose: 3000,
      })
    } finally {
      setIsUploading(false)
      setImages([])
    }
  }

  const deleteImage = async (fabricPhotoId: string, imageUrl: string) => {
    try {
      const response = await fetch("/api/delete-fabric-photo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fabricPhotoId, imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete image")
      }

      toast.success("Image deleted successfully!", { autoClose: 3000 })
      fetchFabricPhotos() // Refresh the fabric photos after deletion
    } catch (error) {
      console.error("Error deleting image:", error)
      toast.error("Failed to delete image. Please try again.", { autoClose: 3000 })
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4a77b5] hover:bg-[#3a67a5] text-white shadow-sm transition-all duration-300">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Fabric
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white shadow-[5px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">Add New Fabric</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Upload Images</Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 transition-all duration-300 relative",
                    isDragging ? "border-[#4a77b5] bg-[#4a77b5]/5" : "border-gray-200 hover:border-[#4a77b5]",
                    images.length === 0 ? "h-48" : "h-auto",
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={images.length >= 6}
                  />
                  {images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
                      <Upload className="h-10 w-10" />
                      <p className="text-sm font-medium">Drag & drop images here or click to browse</p>
                      <p className="text-xs">Upload up to 6 images</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                          <Image
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Fabric ${index + 1}`}
                            fill
                            className="object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600 border border-gray-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 rounded-lg" />
                        </div>
                      ))}
                      {images.length < 6 && (
                        <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4a77b5] hover:border-[#4a77b5] transition-colors duration-300">
                          <Upload className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{images.length}/6 images uploaded</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="hover:bg-darkgreen/80 bg-darkgreen transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={uploadImages}
                disabled={isUploading || images.length === 0}
                className="bg-[#4a77b5] hover:bg-[#3a67a5] text-white shadow-sm transition-all duration-300"
              >
                {isUploading ? "Uploading..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl text-darkgreen font-rubik font-bold mb-4">Fabric Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-[5px]" />
              ))
            : fabricPhotos.flatMap((fabricPhoto) =>
                fabricPhoto.imageUrls.map((url, index) => (
                  <motion.div
                    key={`${fabricPhoto._id}-${index}`}
                    className="relative aspect-square group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Fabric ${index + 1}`}
                      fill
                      className="object-cover rounded-[5px] shadow-xl"
                    />
                    <button
                      onClick={() => deleteImage(fabricPhoto._id, url)}
                      className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600 border border-gray-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                )),
              )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

