"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, Upload, X } from "lucide-react"

interface BusinessFormDialogProps {
  isEdit?: boolean
  business?: any
  onSuccess: () => void
}

export default function BusinessFormDialog({ isEdit = false, business, onSuccess }: BusinessFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(business?.mainImage || null)
  const [overlayImagePreview, setOverlayImagePreview] = useState<string | null>(business?.overlayImage || null)
  const [removeOverlay, setRemoveOverlay] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(formRef.current!)

      // Add removeOverlay flag if needed
      if (removeOverlay) {
        formData.append("removeOverlay", "true")
      }

      const url = isEdit ? `/api/business/${business._id}` : "/api/business"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to save business")
      }

      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error saving business:", error)
      alert("Failed to save business. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setMainImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOverlayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRemoveOverlay(false)
      const reader = new FileReader()
      reader.onload = () => {
        setOverlayImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveOverlay = () => {
    setOverlayImagePreview(null)
    setRemoveOverlay(true)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={isEdit ? "outline" : "default"}
        size={isEdit ? "sm" : "default"}
        className={isEdit ? "border-custom-green text-custom-green hover:bg-custom-cream/20" : ""}
      >
        {isEdit ? (
          <>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" /> Add Business Item
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Business Item" : "Add Business Item"}</DialogTitle>
            <DialogDescription>
              {isEdit ? "Update the details of this business item." : "Add a new business item to your website."}
            </DialogDescription>
          </DialogHeader>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={business?.title || ""}
                  required
                  placeholder="e.g., Weaving"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sectionId">Section ID (for navigation)</Label>
                <Input
                  id="sectionId"
                  name="sectionId"
                  defaultValue={business?.sectionId || ""}
                  required
                  placeholder="e.g., weaving"
                  pattern="[a-z0-9-]+"
                  title="Only lowercase letters, numbers, and hyphens are allowed"
                />
                <p className="text-xs text-gray-500">
                  This ID will be used in the URL for direct navigation (e.g., #weaving)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={business?.description || ""}
                  required
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titleColor">Title Color</Label>
                  <Select name="titleColor" defaultValue={business?.titleColor || "text-custom-green"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-custom-white">White</SelectItem>
                      <SelectItem value="text-custom-green">Green</SelectItem>
                      <SelectItem value="text-custom-black">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paragraphColor">Paragraph Color</Label>
                  <Select name="paragraphColor" defaultValue={business?.paragraphColor || "text-custom-black/80"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-custom-white">White</SelectItem>
                      <SelectItem value="text-white/85">White (85% opacity)</SelectItem>
                      <SelectItem value="text-custom-green">Green</SelectItem>
                      <SelectItem value="text-custom-black">Black</SelectItem>
                      <SelectItem value="text-custom-black/80">Black (80% opacity)</SelectItem>
                      <SelectItem value="text-gray-700">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bgcolor">Background Color</Label>
                  <Select name="bgcolor" defaultValue={business?.bgcolor || "bg-custom-white"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-custom-white">White</SelectItem>
                      <SelectItem value="bg-custom-green">Green</SelectItem>
                      <SelectItem value="bg-custom-black">Black</SelectItem>
                      <SelectItem value="bg-custom-cream/50">Cream (50% opacity)</SelectItem>
                      <SelectItem value="bg-gradient-to-t to-creamwhite from-white">
                        Gradient (Cream to White)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="btncolor">Button Color</Label>
                  <Select name="btncolor" defaultValue={business?.btncolor || "bg-custom-green"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-custom-green">Green</SelectItem>
                      <SelectItem value="bg-custom-black">Black</SelectItem>
                      <SelectItem value="bg-custom-cream">Cream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sectioncolor">Section Color (optional)</Label>
                <Select name="sectioncolor" defaultValue={business?.sectioncolor || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="bg-gradient-to-t to-creamwhite from-white">Gradient (Cream to White)</SelectItem>
                    <SelectItem value="bg-custom-cream/20">Light Cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Main Image</Label>
                <div className="flex flex-col space-y-2">
                  {mainImagePreview && (
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <img
                        src={mainImagePreview || "/placeholder.svg"}
                        alt="Main image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Label
                    htmlFor="mainImage"
                    className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-4 px-6 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    <span>{mainImagePreview ? "Change Image" : "Upload Image"}</span>
                    <Input
                      id="mainImage"
                      name="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                      required={!isEdit}
                    />
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Overlay Image (optional)</Label>
                <div className="flex flex-col space-y-2">
                  {overlayImagePreview && (
                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                      <img
                        src={overlayImagePreview || "/placeholder.svg"}
                        alt="Overlay image preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveOverlay}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Label
                    htmlFor="overlayImage"
                    className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-4 px-6 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    <span>{overlayImagePreview ? "Change Overlay" : "Upload Overlay"}</span>
                    <Input
                      id="overlayImage"
                      name="overlayImage"
                      type="file"
                      accept="image/*"
                      onChange={handleOverlayImageChange}
                      className="hidden"
                    />
                  </Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span> Saving...
                  </>
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
