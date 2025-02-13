"use client"

import React, { useEffect } from "react"
import { FaAngleRight } from "react-icons/fa"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

const WhyChoose = () => {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false })

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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-custom-white py-24 relative z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/fabric/9.jpg"
              alt="Ruia Fabrics Quality"
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-custom-green/20 to-transparent mix-blend-multiply" />
          </motion.div>

          <div className="space-y-8">
            <motion.h2 variants={itemVariants} className="font-rubik text-3xl font-bold text-custom-green">
              WHY CHOOSE RUIA
            </motion.h2>
            <motion.h3 variants={itemVariants} className="font-abel text-4xl md:text-5xl font-normal text-custom-black">
              Unbeatable Prices, Exceptional Quality
            </motion.h3>
            <motion.p variants={itemVariants} className="text-lg font-roboto text-custom-black/80">
              At RUIA, we pride ourselves on delivering premium-quality products at the most competitive prices. Our
              commitment to excellence ensures that every product is crafted with precision, durability, and attention
              to detail.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-roboto text-custom-black/80">
              Our team of experts utilizes advanced technology and sustainable practices to create solutions that meet
              the highest standards. From raw materials to the finished product, every step undergoes rigorous quality
              control to guarantee customer satisfaction.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg font-roboto text-custom-black/80">
              Join the RFPL today and experience the perfect blend of innovation, quality, and affordability. We are
              more than just a brand; we are your trusted partner for excellence.
            </motion.p>

            <motion.div variants={containerVariants} className="flex flex-wrap gap-4 mt-8">
              <Link
                 href="/compnay/about-us"
                className="bg-custom-green text-custom-white px-6 py-3 flex items-center gap-2 font-rubik rounded-lg transition-all duration-300 hover:bg-custom-black"
              >
                Learn More <FaAngleRight />
              </Link>
              <Link
                href="/compnay/contact-us"
                className="bg-custom-black text-custom-white px-6 py-3 flex items-center gap-2 font-rubik rounded-lg transition-all duration-300 hover:bg-custom-green"
              >
                Contact Us <FaAngleRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WhyChoose

