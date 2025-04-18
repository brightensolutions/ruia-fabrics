"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function BusinessSectionForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [section, setSection] = useState<any>({
    title: "",
    description: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch("/api/business-section")
        if (response.ok) {
          const data = await response.json()
          if (data && data._id) {
            setSection(data)
            setImagePreview(data.image || null)
          }
        }
      } catch (error) {
        console.error("Error fetching business section:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSection()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append("title", section.title)
      formData.append("description", section.description)

      if (fileInputRef.current?.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0])
      }

      const response = await fetch("/api/business-section", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to save section")
      }

      const updatedSection = await response.json()
      setSection(updatedSection)
      setSuccessMessage("Section updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error saving section:", error)
      alert("Failed to save section. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="border-custom-cream">
        <CardHeader className="bg-custom-cream/20">
          <CardTitle className="font-rubik text-custom-green">Business Section</CardTitle>
          <CardDescription className="font-roboto">Loading...</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-custom-cream">
      <CardHeader className="bg-custom-cream/20">
        <CardTitle className="font-rubik text-custom-green">Business Section</CardTitle>
        <CardDescription className="font-roboto">Manage the header section of the Business page.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
              required
              placeholder="e.g., Business"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={section.description}
              onChange={(e) => setSection({ ...section, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>

          <div className="space-y-2">
            <Label>Header Image</Label>
            <div className="flex flex-col space-y-4">
              {imagePreview && (
                <div className="relative w-full h-48 rounded-md overflow-hidden">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Header image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Label
                htmlFor="image"
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-4 px-6 hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-5 w-5 mr-2" />
                <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </Label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="bg-custom-green hover:bg-custom-green/90 text-white font-roboto"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="animate-spin mr-2">⏳</span> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
