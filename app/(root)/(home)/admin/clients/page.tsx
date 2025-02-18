"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

interface Client {
  _id: string
  logoUrls: string[]
}

export default function ClientsPage() {
  const [logos, setLogos] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchClients = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/get-clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch clients")
      }

      const data = await response.json()
      console.log("Fetched client data:", data)
      setClients(data.clients)
    } catch (error) {
      console.error("Error fetching clients:", error)
      toast.error("Failed to load client logos. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpload = useCallback(
    (files: FileList | null) => {
      if (files) {
        const newLogos = Array.from(files).filter((file) => file.type.startsWith("image/"))
        if (logos.length + newLogos.length > 6) {
          toast.error(
            "You can only upload up to 6 logos at a time. Please remove some logos or upload in multiple sessions.",
          )
          return
        }
        setLogos((prev) => [...prev, ...newLogos])
      }
    },
    [logos.length],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleLogoUpload(e.dataTransfer.files)
    },
    [handleLogoUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeLogo = (index: number) => {
    setLogos((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadLogos = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      logos.forEach((logo) => {
        formData.append("logos", logo)
      })

      const response = await fetch("/api/add-client", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to upload logos")
      }

      toast.success("Client logos added successfully!")
      fetchClients()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error uploading logos:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload logos. Please try again.")
    } finally {
      setIsUploading(false)
      setLogos([])
    }
  }

 const deleteClient = async (clientId: string) => {
    try {
      const response = await fetch("/api/delete-client", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete client logo")
      }

      toast.success("Client logo deleted successfully!")
      fetchClients() // Refresh the client list after deletion
    } catch (error) {
      console.error("Error deleting client logo:", error)
      toast.error("Failed to delete client logo. Please try again.")
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Client Logos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4a77b5] hover:bg-[#3a67a5] text-white shadow-sm transition-all duration-300">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Logo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white shadow-[5px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">Add New Client Logo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Upload Logos</Label>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 transition-all duration-300 relative",
                    isDragging ? "border-[#4a77b5] bg-[#4a77b5]/5" : "border-gray-200 hover:border-[#4a77b5]",
                    logos.length === 0 ? "h-48" : "h-auto",
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleLogoUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={logos.length >= 6}
                  />
                  {logos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
                      <Upload className="h-10 w-10" />
                      <p className="text-sm font-medium">Drag & drop logos here or click to browse</p>
                      <p className="text-xs">Upload up to 6 logos at a time</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {logos.map((logo, index) => (
                        <div key={index} className="relative group aspect-square">
                          <Image
                            src={URL.createObjectURL(logo) || "/placeholder.svg"}
                            alt={`Logo Preview ${index + 1}`}
                            fill
                            className="object-contain rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeLogo(index)}
                            className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600 border border-gray-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {logos.length < 6 && (
                        <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4a77b5] hover:border-[#4a77b5] transition-colors duration-300">
                          <Upload className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{logos.length}/6 logos selected for upload</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={uploadLogos}
                disabled={isUploading || logos.length === 0}
                className="bg-[#4a77b5] hover:bg-[#3a67a5] text-white shadow-sm transition-all duration-300"
              >
                {isUploading ? "Uploading..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid mt-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-40 h-40 bg-gray-100 rounded-lg animate-pulse" />
            ))
          : clients.map((client) => (
              <motion.div
                key={client._id}
                className="relative rounded-lg flex items-center justify-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-40 h-40">
                  <Image
                    src={client.logoUrls[0] || "/placeholder.svg"}
                    alt="Client Logo"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <button
                  onClick={() => deleteClient(client._id)}
                  className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600 border border-gray-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
      </div>
    </div>
  )
}

