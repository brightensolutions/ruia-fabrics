"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface WelcomeContent {
  title: string
  paragraph1: string
  paragraph2: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
}

export default function WelcomePage() {
  const [content, setContent] = useState<WelcomeContent>({
    title: "",
    paragraph1: "",
    paragraph2: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWelcomeContent = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/welcome")

        if (!response.ok) {
          throw new Error("Failed to fetch welcome content")
        }

        const data = await response.json()
        setContent(data)
      } catch (err) {
        console.error("Error fetching welcome content:", err)
        setError("Failed to load content. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchWelcomeContent()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError("")

      const response = await fetch("/api/welcome", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) {
        throw new Error("Failed to update welcome content")
      }

      setSuccessMessage("Welcome content updated successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error updating welcome content:", err)
      setError("Failed to update content. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Welcome Section</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">{error}</div>}

        <Card className="border-custom-cream bg-white shadow-xl">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">Welcome Section</CardTitle>
            <CardDescription className="font-roboto">
              Manage the content of your website's welcome section.
            </CardDescription>
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
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={content.title}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    rows={4}
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
                    onChange={handleChange}
                    rows={4}
                    className="font-roboto border-custom-cream"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button1Text" className="font-roboto">
                      First Button Text
                    </Label>
                    <Input
                      id="button1Text"
                      name="button1Text"
                      value={content.button1Text}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="button1Link" className="font-roboto">
                      First Button Link
                    </Label>
                    <Input
                      id="button1Link"
                      name="button1Link"
                      value={content.button1Link}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button2Text" className="font-roboto">
                      Second Button Text
                    </Label>
                    <Input
                      id="button2Text"
                      name="button2Text"
                      value={content.button2Text}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="button2Link" className="font-roboto">
                      Second Button Link
                    </Label>
                    <Input
                      id="button2Link"
                      name="button2Link"
                      value={content.button2Link}
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
