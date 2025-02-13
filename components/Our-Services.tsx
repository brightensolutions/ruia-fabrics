"use client"

import type React from "react"
import { DirectionAwareHover } from "./ui/direction-aware-hover"
import { motion } from "framer-motion"

interface Service {
  title: string
  description: string
  imageUrl: string
}

const OurServices: React.FC = () => {
  const services: Service[] = [
    {
      title: "Spinning Division",
      description: "State-of-the-art spinning facilities",
      imageUrl: "/images/Spinning.png",
    },
    {
      title: "Sizing Division",
      description: "Precision sizing for perfect weaves",
      imageUrl: "/images/weaving-preparatory.webp",
    },
    {
      title: "Weaving Division",
      description: "Advanced looms for premium fabrics",
      imageUrl: "/images/infra-weaving.webp",
    },
  ]

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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="bg-custom-green py-24 relative z-40">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h3 className="font-rubik text-2xl font-bold text-custom-cream mb-2">OUR SERVICES</h3>
          <h2 className="font-abel text-4xl md:text-5xl font-normal text-custom-white mb-6">Textile is What We Do</h2>
          <p className="md:w-[70%] w-full mx-auto font-roboto text-custom-cream/90 text-lg leading-relaxed">
            Ruia Fabrics is a legacy in textiles, rooted in India's rich history since 1952. From being a yarn merchant
            to a global fabric manufacturer, we've embraced change and innovation. We produce voile, chiffon, crepe, and
            georgette fabrics, catering to both domestic and international markets. Sustainability is at our core,
            collaborating with Aditya Birla Group to produce eco-friendly fabrics like LIVA and LIVA EcoVera.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16" variants={containerVariants}>
          {services.map((service, index) => (
            <motion.div key={index} className="relative" variants={itemVariants}>
              <DirectionAwareHover imageUrl={service.imageUrl}>
                <div className="p-6 text-custom-white">
                  <h4 className="font-rubik text-2xl font-bold mb-2">{service.title}</h4>
                  <p className="font-abel text-lg">{service.description}</p>
                </div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OurServices

