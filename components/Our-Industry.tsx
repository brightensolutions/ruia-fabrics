"use client"
import type React from "react"
import { NumberTicker } from "./ui/number-ticker"
import { motion } from "framer-motion"

type IndustryStat = {
  number: string
  label: string
}

const OurIndustry: React.FC = () => {
  const industryData: IndustryStat[] = [
    { number: "200+", label: "Our Fabric" },
    { number: "7+", label: "Export Country" },
    { number: "7500+", label: "Satisfied Customer" },
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
    <div className="pb-14 bg-white z-40 relative">
      {/* Decorative Elements */}
      

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-rubik font-bold text-custom-green">Our Industry In Numbers</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {industryData.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-custom-white rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300" />
              <div className="relative p-8 text-center">
                <div className="mb-4">
                  <span className="text-6xl md:text-7xl font-abel font-bold text-custom-green inline-flex items-center justify-center">
                    <NumberTicker value={Number.parseInt(item.number.replace(/\D/g, ""), 10)} className="font-abel" />
                    <span className="text-custom-green ml-1">+</span>
                  </span>
                </div>
                <p className="text-xl font-rubik text-custom-black/80 group-hover:text-custom-black transition-colors duration-300">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OurIndustry

