"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Upload } from "lucide-react"

interface SliderFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void>
  initialData?: {
    id: string
    title: string
    image: string
  }
  mode: "create" | "edit"
}

export function SliderFormDialog({ isOpen, onClose, onSubmit, initialData, mode }: SliderFormDialogProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (mode === "create" && !imageFile) {
      setError("Image is required")
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("title", title)

      if (imageFile) {
        formData.append("image", imageFile)
      }

      await onSubmit(formData)
      onClose()
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Failed to save slider. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-rubik text-custom-green">
            {mode === "create" ? "Add New Slider Image" : "Edit Slider Image"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title" className="font-roboto">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter slider title"
              className="font-roboto border-custom-cream"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="font-roboto">
              Image
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
              onClick={onClose}
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
                  {mode === "create" ? "Adding..." : "Saving..."}
                </>
              ) : mode === "create" ? (
                "Add Slider"
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
