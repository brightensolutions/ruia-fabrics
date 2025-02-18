"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion"

interface ContactData {
  phone: string
  email: string
  address: string
}

export default function AdminContact() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactData>({
    phone: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      const response = await fetch("/api/update-contact")
      if (!response.ok) {
        throw new Error("Failed to fetch contact data")
      }
      const data = await response.json()
      if (data.contact) {
        setFormData(data.contact)
      }
    } catch (error) {
      console.error("Error fetching contact data:", error)
      toast.error("Failed to load contact information")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/update-contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact")
      }

      toast.success("Contact information updated successfully")
    } catch (error) {
      console.error("Error updating contact:", error)
      toast.error("Failed to update contact information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-lg bg-white rounded-[10px] border-[1px] border-black/15">
          <CardHeader>
            <CardTitle className="text-2xl font-rubik text-custom-green">Update Contact Information</CardTitle>
            <CardDescription>
              Make changes to your contact information here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-custom-black">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                   className="font-roboto rounded-[5px] text-custom-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-custom-black">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="font-roboto rounded-[5px] text-custom-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-custom-black">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                   className="font-roboto rounded-[5px] text-custom-black"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-custom-cream hover:bg-custom-white border-[1px] border-custom-black/20 transition-colors duration-300"
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <ToastContainer/>
    </div>
  )
}

