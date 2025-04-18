"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload } from "lucide-react"

interface AboutUsData {
  title: string
  description: string
  image: string
  linkHref: string
  linkLabel: string
  blobUrl?: string
}

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState<AboutUsData>({
    title: "",
    description: "",
    image: "",
    linkHref: "",
    linkLabel: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/about-us")

        if (!response.ok) {
          throw new Error("Failed to fetch about us information")
        }

        const data = await response.json()
        setAboutData(data)
        if (data.image) {
          setImagePreview(data.image)
        }
      } catch (err) {
        console.error("Error fetching about us information:", err)
        setError("Failed to load about us information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutData((prev) => ({ ...prev, [name]: value }))
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

  const handleImageUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setSaving(true)

      const formData = new FormData()
      formData.append("title", aboutData.title)
      formData.append("description", aboutData.description)
      formData.append("linkHref", aboutData.linkHref)
      formData.append("linkLabel", aboutData.linkLabel)

      if (imageFile) {
        formData.append("image", imageFile)
      } else if (aboutData.image) {
        formData.append("existingImage", aboutData.image)
      }

      if (aboutData.blobUrl) {
        formData.append("blobUrl", aboutData.blobUrl)
      }

      const response = await fetch("/api/about-us", {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to update about us information")
      }

      const updatedData = await response.json()
      setAboutData(updatedData)
      setImagePreview(updatedData.image)
      setImageFile(null)

      setSuccessMessage("About us information updated successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error updating about us information:", err)
      setError("Failed to update about us information. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">About Us</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">{error}</div>}

        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">About Us Section</CardTitle>
            <CardDescription className="font-roboto">Manage the content of your About Us section.</CardDescription>
          </CardHeader>

          {loading ? (
            <CardContent className="pt-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-custom-green" />
            </CardContent>
          ) : (
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-roboto">
                    Section Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={aboutData.title}
                    onChange={handleChange}
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
                    value={aboutData.description}
                    onChange={handleChange}
                    rows={5}
                    className="font-roboto border-custom-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-roboto">Image</Label>
                  <div className="flex flex-col space-y-4">
                    {imagePreview && (
                      <div className="border border-custom-cream rounded-md overflow-hidden w-full max-w-md">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="About Us Preview"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleImageUploadClick}
                        className="border-custom-green text-custom-green hover:bg-custom-cream/20"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {imagePreview ? "Change Image" : "Upload Image"}
                      </Button>
                      <Input
                        ref={fileInputRef}
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-500 font-roboto">
                        {imageFile ? imageFile.name : "No new file selected"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkLabel" className="font-roboto">
                      Button Text
                    </Label>
                    <Input
                      id="linkLabel"
                      name="linkLabel"
                      value={aboutData.linkLabel}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkHref" className="font-roboto">
                      Button Link
                    </Label>
                    <Input
                      id="linkHref"
                      name="linkHref"
                      value={aboutData.linkHref}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      </main>
    </>
  )
}
