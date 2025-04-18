"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function ProductSectionForm() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    linkHref: "",
    linkLabel: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/product-section")
        if (response.ok) {
          const data = await response.json()
          setData(data)
          setImagePreview(data.image)
        }
      } catch (error) {
        console.error("Error fetching product section data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage("")

    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("linkHref", data.linkHref)
      formData.append("linkLabel", data.linkLabel)

      if (imageFile) {
        formData.append("image", imageFile)
      }

      const response = await fetch("/api/product-section", {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update product section")
      }

      const updatedData = await response.json()
      setData(updatedData)
      setSuccessMessage("Product section updated successfully!")
    } catch (error) {
      console.error("Error updating product section:", error)
      alert("Failed to update product section. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
      </div>
    )
  }

  return (
    <Card className="border-custom-cream bg-custom-cream">
      <CardHeader className="bg-custom-cream/20">
        <CardTitle className="font-rubik text-custom-green">Product Section</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Header Image</Label>
            <div className="flex flex-col space-y-4">
              {imagePreview && (
                <div className="relative w-full h-60 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Header image preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <Button type="button"  variant="outline" onClick={() => imageInputRef.current?.click()} className="w-fit bg-custom-green">
                <Upload className="h-4 w-4 mr-2" />
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkLabel">Button Label</Label>
              <Input
                id="linkLabel"
                value={data.linkLabel}
                onChange={(e) => setData({ ...data, linkLabel: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkHref">Button Link</Label>
              <Input
                id="linkHref"
                value={data.linkHref}
                onChange={(e) => setData({ ...data, linkHref: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-custom-green text-white" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
