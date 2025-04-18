"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Plus, Upload } from "lucide-react"

interface ProductFormDialogProps {
  isEdit?: boolean
  product?: any
  onSuccess: () => void
}

export default function ProductFormDialog({ isEdit = false, product, onSuccess }: ProductFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [overlayImageFile, setOverlayImageFile] = useState<File | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState<string>(product?.mainImage || "")
  const [overlayImagePreview, setOverlayImagePreview] = useState<string>(product?.overlayImage || "")
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const overlayImageInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMainImageFile(file)
      setMainImagePreview(URL.createObjectURL(file))
    }
  }

  const handleOverlayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setOverlayImageFile(file)
      setOverlayImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Add image files if selected
      if (mainImageFile) {
        formData.set("mainImage", mainImageFile)
      } else if (product?.mainImage) {
        formData.set("mainImageUrl", product.mainImage)
      }

      if (overlayImageFile) {
        formData.set("overlayImage", overlayImageFile)
      } else if (product?.overlayImage) {
        formData.set("overlayImageUrl", product.overlayImage)
      }

      const url = isEdit ? `/api/products/${product._id}` : "/api/products"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      setOpen(false)
      onSuccess()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isEdit ? "outline" : "default"}
          className={isEdit ? "border-custom-green text-custom-green" : ""}
        >
          {isEdit ? (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={product?.title || ""} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleColor">Title Color</Label>
              <Select name="titleColor" defaultValue={product?.titleColor || "text-custom-green"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select title color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-custom-white">White</SelectItem>
                  <SelectItem value="text-custom-green">Green</SelectItem>
                  <SelectItem value="text-custom-black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} defaultValue={product?.description || ""} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paragraphColor">Paragraph Color</Label>
              <Select name="paragraphColor" defaultValue={product?.paragraphColor || "text-custom-black/80"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select paragraph color" />
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

            <div className="space-y-2">
              <Label htmlFor="imagePosition">Image Position</Label>
              <Select name="imagePosition" defaultValue={product?.imagePosition || "right"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Main Image</Label>
              <div className="flex flex-col space-y-2">
                {mainImagePreview && (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={mainImagePreview || "/placeholder.svg"}
                      alt="Main image preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                />
                <Button type="button" variant="outline" className="bg-custom-green" onClick={() => mainImageInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  {mainImagePreview ? "Change Image" : "Upload Image"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Overlay Image (Optional)</Label>
              <div className="flex flex-col space-y-2">
                {overlayImagePreview && (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={overlayImagePreview || "/placeholder.svg"}
                      alt="Overlay image preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  ref={overlayImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleOverlayImageChange}
                  className="hidden"
                />
                <Button type="button" className="bg-custom-green" variant="outline" onClick={() => overlayImageInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  {overlayImagePreview ? "Change Image" : "Upload Image"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
            <div className="space-y-2">
              <Label htmlFor="connectUsLink">Connect Us Link</Label>
              <Input
                id="connectUsLink"
                name="connectUsLink"
                defaultValue={product?.connectUsLink || "/compnay/contact-us"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input id="order" name="order" type="number" defaultValue={product?.order || "0"} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bgcolor">Background Color</Label>
              <Select name="bgcolor" defaultValue={product?.bgcolor || "bg-custom-white"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select background color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-custom-white">White</SelectItem>
                  <SelectItem value="bg-custom-green">Green</SelectItem>
                  <SelectItem value="bg-custom-black">Black</SelectItem>
                  <SelectItem value="bg-custom-cream/50">Cream (50% opacity)</SelectItem>
                  <SelectItem value="bg-gradient-to-t to-creamwhite from-white">Gradient (Cream to White)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 hidden">
              <Label htmlFor="sectioncolor">Section Color (Optional)</Label>
              <Input id="sectioncolor" name="sectioncolor" defaultValue={product?.sectioncolor || ""} />
            </div>

            <div className="space-y-2 hidden">
              <Label htmlFor="btncolor">Button Color</Label>
              <Select name="btncolor" defaultValue={product?.btncolor || "bg-custom-green"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select button color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-custom-green">Green</SelectItem>
                  <SelectItem value="bg-custom-black">Black</SelectItem>
                  <SelectItem value="bg-custom-cream">Cream</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" className="bg-custom-green hover:bg-custom-cream text-white hover:text-black rounded-xl" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-custom-green hover:bg-custom-cream text-white hover:text-black rounded-xl" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
