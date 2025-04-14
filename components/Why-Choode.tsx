"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Leaf, Package, Award, Recycle, Globe, Sparkles } from "lucide-react"

const WhyChooseAlternative = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Premium Quality Materials",
      description: "We source our materials from the best eco-friendly and sustainable suppliers worldwide.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Exceptional Craftsmanship",
      description: "Our team of skilled artisans ensures every fabric meets our rigorous quality standards.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "No Minimum Orders",
      description: "Our designs and weaves are accessible to boutique brands for low quantities as well.",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Eco-Friendly Processes",
      description: "We only use eco-friendly, non-harmful dyes and sustainable manufacturing processes.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Sustainable Packaging",
      description: "Our packaging is made from recycled materials to minimize environmental impact.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Proudly Made In India",
      description: "We are proudly Made in India, supporting local communities and traditional craftsmanship.",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-20"
        >

          <h3  className="text-4xl md:text-6xl font-abel font-bold text-black mb-8">
             Why Ruia Fabrics
          </h3>

         

          <motion.p variants={itemVariants} className="max-w-5xl mx-auto text-black font-abel font-semibold text-2xl">
          At Ruia Fabrics, we blend timeless craftsmanship with modern innovation to deliver fabrics that embody quality, durability, and refined design.
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="group">
              <div className="relative">
                {/* Decorative thread */}
                <div className="absolute -top-5 -left-5 w-10 h-10">
                  <div className="absolute w-full h-0.5 bg-[#d3a456] rotate-45 origin-bottom-left" />
                  <div className="absolute w-0.5 h-full bg-[#d3a456] rotate-45 origin-bottom-left" />
                </div>

                {/* Main content */}
                <div className="relative p-8 bg-custom-green backdrop-blur-3xl rounded-xl min-h-[280px] shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[#2c5e3f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon with animated background */}
                  <div className="relative w-16 h-16 mb-6 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-custom-cream  transition-colors duration-300" />
                    
                    <div className="absolute inset-0 flex items-center justify-center text-black ">
                      {feature.icon}
                    </div>
                  </div>

                  <h4 className="text-xl font-medium text-white mb-3 group-hover:text-white/80 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-white font-roboto  font-normal leading-7">{feature.description}</p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#2c5e3f]/0 via-[#2c5e3f] to-[#2c5e3f]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={containerVariants} className="mt-20 text-center">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2c5e3f] via-[#d3a456] to-[#2c5e3f] blur-md opacity-30 rounded-full" />
            <Link
              href="/compnay/about-us"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#2c5e3f] text-white rounded-full hover:bg-[#234832] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Learn More About Our Process</span>
              <motion.span
                className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
 
    </section>
  )
}

export default WhyChooseAlternative

