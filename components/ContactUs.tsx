"use client"

import type React from "react"
import { MdAddCall, MdEmail, MdLocationOn } from "react-icons/md"
import { motion } from "framer-motion"

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: string
}

const ContactUs = () => {
  const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content }) => {
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
          <p className="mt-3 text-base font-roboto text-custom-black/70">{content}</p>
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
            <ContactCard icon={<MdAddCall className="h-8 w-8" />} title="Phone" content="+91 7021418483" />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard icon={<MdEmail className="h-8 w-8" />} title="Email" content="admin@ruiafabrics.com" />
          </motion.div>
          <motion.div variants={itemVariants} className="h-full">
            <ContactCard
              icon={<MdLocationOn className="h-8 w-8" />}
              title="Address"
              content="187/A-2 Shah & Nahar Ind. Est Lower Parel Mumbai - 400013 (India)"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 bg-custom-green rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto"
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
              </div>
              <div className="space-y-6">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
                <input
                  type="text"
                  placeholder="Enter Subject"
                  className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                           bg-white/10 text-custom-white placeholder-custom-cream/70
                           focus:border-custom-cream transition-all duration-300
                           font-roboto"
                />
              </div>
            </div>

            <div className="mt-6">
              <textarea
                placeholder="Enter Message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg outline-none border-2 border-transparent 
                         bg-white/10 text-custom-white placeholder-custom-cream/70
                         focus:border-custom-cream transition-all duration-300
                         font-roboto resize-none"
              />
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-custom-white px-12 py-4 rounded-lg text-custom-green font-rubik font-medium
                         transition-all duration-300 hover:bg-custom-cream hover:text-custom-black
                         focus:outline-none focus:ring-2 focus:ring-custom-cream focus:ring-offset-2
                         focus:ring-offset-custom-green"
              >
                Submit Message
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactUs

