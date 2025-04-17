"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Upload } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface BrandFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => Promise<void>
  initialData?: {
    id: string
    image: string
    active: boolean
  }
  mode: "create" | "edit"
}

export function BrandFormDialog({ isOpen, onClose, onSubmit, initialData, mode }: BrandFormDialogProps) {
  const [active, setActive] = useState(initialData?.active !== false)
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

    if (mode === "create" && !imageFile) {
      setError("Logo image is required")
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append("active", String(active))

      if (imageFile) {
        formData.append("image", imageFile)
      }

      await onSubmit(formData)
      onClose()
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("Failed to save brand. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-rubik text-custom-green">
            {mode === "create" ? "Add New Brand Logo" : "Edit Brand Logo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-md text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="image" className="font-roboto">
              Logo Image
            </Label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="border-custom-green text-custom-green hover:bg-custom-cream/20"
              >
                <Upload className="h-4 w-4 mr-2" />
                {imagePreview ? "Change Logo" : "Upload Logo"}
              </Button>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <span className="text-sm text-gray-500 font-roboto">
                {imageFile ? imageFile.name : "No file selected"}
              </span>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4 border border-custom-cream rounded-md overflow-hidden">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-contain" />
            </div>
          )}

          {mode === "edit" && (
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
                "Add Brand"
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
