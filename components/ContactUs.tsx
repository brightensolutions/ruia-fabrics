"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MdAddCall, MdEmail, MdLocationOn } from "react-icons/md"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
  isLoading: boolean
}

interface ContactData {
  phone: string
  email: string
  factoryAddress: string
  headOfficeAddress: string
  title: string
  subtitle: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, isLoading }) => {
  let href = ""
  if (title === "Phone") {
    href = `tel:${content}`
  } else if (title === "Email") {
    href = `mailto:${content}`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-custom-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
    >
      <a href={href} className="flex flex-col h-full" aria-label={title}>
        <div className="px-4 sm:px-8 py-6 sm:py-10 text-center flex-grow flex flex-col justify-between">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-custom-cream">
              <div className="text-custom-green">{icon}</div>
            </div>
            <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-rubik font-semibold text-custom-black">{title}</h3>
          </div>
          {isLoading ? (
            <Skeleton className="h-6 w-3/4 mx-auto mt-3" />
          ) : (
            <p className="mt-3 text-sm sm:text-base font-roboto text-custom-black/70">{content}</p>
          )}
        </div>
      </a>
    </motion.div>
  )
}

const AddressCard: React.FC<{ headOfficeAddress: string; factoryAddress: string; isLoading: boolean }> = ({
  headOfficeAddress,
  factoryAddress,
  isLoading,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-custom-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
    >
      <div className="px-4 sm:px-8 py-6 sm:py-10 text-center flex-grow flex flex-col justify-between">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 sm:h-16 w-12 sm:w-16 rounded-full bg-custom-cream">
            <div className="text-custom-green">
              <MdLocationOn className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="space-y-4 mt-6">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-16 w-full mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-16 w-full mx-auto" />
          </div>
        ) : (
          <div className="mt-3 text-sm sm:text-base font-roboto text-custom-black/70">
            <div className="mb-4">
              <h4 className="font-bold mb-1 font-roboto text-xl sm:text-2xl">Head Office:</h4>
              <p className="text-black text-base sm:text-xl font-semibold">{headOfficeAddress}</p>
            </div>
            <div>
              <h4 className="font-bold mb-1 font-roboto text-xl sm:text-2xl">Factory Address:</h4>
              <p className="text-black text-base sm:text-xl font-semibold">{factoryAddress}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ContactUs: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData>({
    phone: "",
    email: "",
    factoryAddress: "",
    headOfficeAddress: "",
    title: "Contact Us",
    subtitle: "We'd love to hear from you! Reach out using the contact information below.",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (error) {
    return (
      <section id="contact" className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-rubik font-semibold text-custom-black">{contactData.title}</h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-xl font-semibold font-roboto text-custom-black/70">
            {contactData.subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mt-16 grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdAddCall className="h-6 w-6 sm:h-8 sm:w-8" />}
              title="Phone"
              content={contactData.phone}
              isLoading={loading}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdEmail className="h-6 w-6 sm:h-8 sm:w-8" />}
              title="Email"
              content={contactData.email}
              isLoading={loading}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-4 sm:mt-8">
          <motion.div variants={itemVariants} className="h-full">
            <AddressCard
              headOfficeAddress={contactData.headOfficeAddress}
              factoryAddress={contactData.factoryAddress}
              isLoading={loading}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs
