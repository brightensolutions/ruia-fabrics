"use client"

import type React from "react"
import { MdAddCall, MdEmail, MdLocationOn } from "react-icons/md"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
  isLoading?: boolean
}

interface ContactData {
  phone: string
  email: string
  address: string
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const ContactUs = () => {
  const [contactData, setContactData] = useState<ContactData>({
    phone: "",
    email: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
        setContactData(data.contact)
      }
    } catch (error) {
      console.error("Error fetching contact data:", error)
      toast.error("Failed to load contact information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast.success("Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, isLoading }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-custom-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
      >
        <div className="px-8 py-10 text-center flex-grow flex flex-col justify-between">
          <div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-custom-cream">
              <div className="text-custom-green">{icon}</div>
            </div>
            <h3 className="mt-6 text-xl font-rubik font-semibold text-custom-black">{title}</h3>
          </div>
          {isLoading ? (
            <Skeleton className="h-6 w-3/4 mx-auto mt-3" />
          ) : (
            <p className="mt-3 text-base font-roboto text-custom-black/70">{content}</p>
          )}
        </div>
      </motion.div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="relative z-40 bg-white py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-custom-green mb-4">Get In Touch</h1>
          <p className="font-abel text-xl text-custom-black/80 max-w-2xl mx-auto">
            We'd love to hear from you. Please fill out this form or reach out using the contact details below.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdAddCall className="h-8 w-8" />}
              title="Phone"
              content={contactData.phone}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdEmail className="h-8 w-8" />}
              title="Email"
              content={contactData.email}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdLocationOn className="h-8 w-8" />}
              title="Address"
              content={contactData.address}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="mt-20 bg-custom-green rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
              </div>
              <div className="space-y-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter Subject"
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
              </div>
            </div>

            <div className="mt-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                         bg-white/10 text-custom-white placeholder-custom-cream/70
                         focus:border-custom-cream transition-all duration-300
                         font-roboto resize-none"
              />
            </div>

            <div className="mt-8 text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-custom-white px-12 py-4 rounded-lg text-custom-green font-rubik font-medium
                         transition-all duration-300 hover:bg-custom-cream hover:text-custom-black
                         focus:outline-none focus:ring-2 focus:ring-custom-cream focus:ring-offset-2
                         focus:ring-offset-custom-green disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default ContactUs

