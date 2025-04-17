"use client"

import type React from "react"
import { DirectionAwareHover } from "./ui/direction-aware-hover"
import { motion } from "framer-motion"

interface Service {
  imageUrl: string
}

const OurServices: React.FC = () => {
  const services: Service[] = [
    {
      imageUrl: "/fabric/fabric1.jpeg",
    },
    {
      imageUrl: "/fabric/fabric3.jpeg",
    },
    {
      imageUrl: "/fabric/fabric2.jpeg",
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
          <h2 className=" text-4xl md:text-5xl font-semibold font-abel text-custom-white mb-6">Textile Is What We Do</h2>
          <p className="md:w-[70%] w-full mx-auto font-roboto font-normal text-custom-white text-lg leading-relaxed mb-2">
          At Ruia Fabrics, textiles are at the core of who we are. We specialize in high-quality Velvet, Voile, Chiffon, Crepe, Georgette, and Linen fabrics, tailored for both domestic and international markets.
          </p>
          <p className="md:w-[72%] w-full mx-auto font-roboto font-normal text-custom-white text-lg leading-relaxed">
          Guided by innovation and a commitment to sustainability, we offer eco-conscious fabric solutions including BCI Cotton, European Flax, FSE Viscose, EcoLIVA, and EcoVero—delivering style with responsibility.
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
