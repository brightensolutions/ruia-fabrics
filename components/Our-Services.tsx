"use client"

import type React from "react"
import { DirectionAwareHover } from "./ui/direction-aware-hover"
import { motion } from "framer-motion"
import Image from "next/image" // Import the correct Image component from Next.js

interface Service {
  imageUrl: string
}

const OurServices: React.FC = () => {
  const services: Service[] = [
    {
      imageUrl: "/fabric/014A7479.JPG",
    },
    {
      imageUrl: "/fabric/014A7326.JPG",
    },
    {
      imageUrl: "/fabric/014A7500.JPG",
    },
  ]

  const Manufacturing = [
    {
      id: 1,
      name: "Hemp Fabric",
      image: "/Manufacturing/home-f-icon-1.png",
    },
    {
      id: 2,
      name: "Bamboo Fabric",
      image: "/Manufacturing/home-f-icon-2.png",
    },
    {
      id: 3,
      name: "100% Organic Cotton",
      image: "/Manufacturing/home-f-icon-3.png",
    },
    {
      id: 4,
      name: "Aloe Vera Fabric",
      image: "/Manufacturing/home-f-icon-4.png",
    },
    {
      id: 5,
      name: "Tencel Fabric",
      image: "/Manufacturing/home-f-icon-5.png",
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
          {/* <h3 className="font-rubik text-2xl font-bold text-custom-cream mb-2">OUR SERVICES</h3> */}
          <h2 className=" text-4xl md:text-5xl font-semibold font-abel text-custom-white mb-6">Textile is What We Do</h2>
          <p className="md:w-[70%] w-full mx-auto font-roboto font-normal text-custom-white text-lg leading-relaxed">
            Ruia Fabrics is a legacy in textiles, rooted in India's rich history since 1952. From being a yarn merchant
            to a global fabric manufacturer, we've embraced change and innovation. We produce voile, chiffon, crepe, and
            georgette fabrics, catering to both domestic and international markets. Sustainability is at our core,
            collaborating with Aditya Birla Group to produce eco-friendly fabrics like LIVA and LIVA EcoVera.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16" variants={containerVariants}>
          {services.map((service, index) => (
            <motion.div key={index} className="relative" variants={itemVariants}>
              <DirectionAwareHover className="rounded-[10px]" imageUrl={service.imageUrl}>
                <div className="p-6 text-custom-white">
                  {/* <h4 className="font-rubik text-2xl font-bold mb-2">{service.title}</h4>
                  <p className="font-abel text-lg">{service.description}</p> */}
                </div>
              </DirectionAwareHover>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-5 " variants={containerVariants}>
          {Manufacturing.map((service, index) => (
            <motion.div key={index} className="relative group" variants={itemVariants}>
              <div className=" rounded-lg  overflow-hidden transition-all duration-300 ">
                <div className=" relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    width={100}
                    height={100}
                    alt={service.name}
                    className="transition-transform m-auto duration-300 group-hover:scale-105 filter brightness-0 invert"
                  />
                </div>
                <p className="py-4 px-2 text-center font-medium text-white  mt-2 font-rubik">{service.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>
    </div>
  )
}

export default OurServices
