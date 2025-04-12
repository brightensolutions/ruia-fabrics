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
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 " />
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none" >
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <polygon
              points="25,0 50,0 62.5,21.7 50,43.4 25,43.4 12.5,21.7"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
            <polygon
              points="75,0 100,0 112.5,21.7 100,43.4 75,43.4 62.5,21.7"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
            <polygon
              points="0,0 25,0 37.5,21.7 25,43.4 0,43.4 -12.5,21.7"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
            <polygon
              points="25,43.4 50,43.4 62.5,65.1 50,86.8 25,86.8 12.5,65.1"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
            <polygon
              points="75,43.4 100,43.4 112.5,65.1 100,86.8 75,86.8 62.5,65.1"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
            <polygon
              points="0,43.4 25,43.4 37.5,65.1 25,86.8 0,86.8 -12.5,65.1"
              fill="none"
              stroke="#2c5e3f"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-20"
        >
          {/* <motion.div variants={itemVariants} className="inline-block relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2c5e3f] via-[#d3a456] to-[#2c5e3f] blur-md opacity-30 rounded-lg" />
            <h2 className="relative bg-white/80 backdrop-blur-sm font-rubik px-6 py-2 rounded-lg text-[#2c5e3f] text-lg font-medium tracking-wider uppercase">
            Why ruia fabrics
            </h2>
          </motion.div> */}

          <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-abel font-bold text-black mb-8">
             Why ruia fabrics
          </motion.h3>

          <motion.div variants={itemVariants} className="w-32 h-1 mx-auto mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2c5e3f] via-[#d3a456] to-[#2c5e3f]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#2c5e3f] via-[#d3a456] to-[#2c5e3f]"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="max-w-5xl mx-auto text-black font-abel font-semibold text-2xl">
            At Ruia Fabrics, we combine traditional craftsmanship with modern innovation to create fabrics that stand
            the test of time.
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
                    <div className="absolute inset-0 bg-custom-cream group-hover:bg-[#2c5e3f]/20 transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-black group-hover:text-white">
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

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-[5%] w-24 h-24 border border-[#d3a456]/30 rounded-full"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-32 h-32 border border-[#2c5e3f]/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-[5%] w-16 h-16 border border-[#d3a456]/30 rounded-full"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </section>
  )
}

export default WhyChooseAlternative

