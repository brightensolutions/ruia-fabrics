"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface ContactData {
  phone: string
  email: string
  factoryAddress: string
  headOfficeAddress: string
  title: string
  subtitle: string
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData>({
    phone: "",
    email: "",
    factoryAddress: "",
    headOfficeAddress: "",
    title: "",
    subtitle: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/contact")

        if (!response.ok) {
          throw new Error("Failed to fetch contact information")
        }

        const data = await response.json()
        setContactData(data)
      } catch (err) {
        console.error("Error fetching contact information:", err)
        setError("Failed to load contact information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchContactData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setSaving(true)

      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact information")
      }

      setSuccessMessage("Contact information updated successfully!")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error updating contact information:", err)
      setError("Failed to update contact information. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="bg-custom-white border-b border-custom-cream p-4 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik text-custom-green">Contact Information</h1>
      </header>

      <main className="p-6">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">{successMessage}</div>
        )}

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">{error}</div>}

        <Card className="border-custom-cream bg-custom-cream">
          <CardHeader className="bg-custom-cream/20">
            <CardTitle className="font-rubik text-custom-green">Contact Information</CardTitle>
            <CardDescription className="font-roboto">Manage your contact information and details.</CardDescription>
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
                    value={contactData.title}
                    onChange={handleChange}
                    className="font-roboto border-custom-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="font-roboto">
                    Section Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={contactData.subtitle}
                    onChange={handleChange}
                    className="font-roboto border-custom-cream"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-roboto">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-roboto">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={contactData.phone}
                      onChange={handleChange}
                      className="font-roboto border-custom-cream"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="factoryAddress" className="font-roboto">
                    Factory Address
                  </Label>
                  <Textarea
                    id="factoryAddress"
                    name="factoryAddress"
                    value={contactData.factoryAddress}
                    onChange={handleChange}
                    rows={3}
                    className="font-roboto border-custom-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headOfficeAddress" className="font-roboto">
                    Head Office Address
                  </Label>
                  <Textarea
                    id="headOfficeAddress"
                    name="headOfficeAddress"
                    value={contactData.headOfficeAddress}
                    onChange={handleChange}
                    rows={3}
                    className="font-roboto border-custom-cream"
                  />
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
