"use client"

import type React from "react"
import { MdAddCall, MdEmail, MdLocationOn } from "react-icons/md"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
  isLoading: boolean
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
      </a>
    </motion.div>
  )
}

const AddressCard: React.FC<ContactCardProps> = ({ icon, title, content, isLoading }) => {
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

const ContactUs: React.FC = () => {
  const contactData = {
    phone: "+91 7021418483",
    email: "admin@ruiafabrics.com",
    address: "Plot No. 0-168 To 0-171, Govindji ind. Park, Vill. Makhinga, Nr. Sabar Hotel. Palsana. Dist. Surat",
  }
  const isLoading = false

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-rubik font-semibold text-custom-black">Contact Us</h2>
          <p className="mt-4 text-xl font-semibold font-roboto text-custom-black/70">
            We'd love to hear from you! Reach out using the contact information below.
          </p>
        </div>

        <motion.div variants={containerVariants} className="mt-16 grid gap-8 sm:grid-cols-2">
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
        </motion.div>

        <motion.div variants={containerVariants} className="mt-8">
          <motion.div variants={itemVariants} className="h-full">
            <AddressCard
              icon={<MdLocationOn className="h-8 w-8" />}
              title="Address"
              content={contactData.address}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs

