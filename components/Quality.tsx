"use client"

import Image from "next/image"
import Link from "next/link"
import { FaAngleRight } from "react-icons/fa"
import { motion } from "framer-motion"

const Quality = () => {
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
    <div className="bg-custom-cream py-24 relative overflow-hidden  z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-custom-green/10 to-transparent" />
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div className="w-full md:w-1/2 space-y-8" variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="font-rubik text-3xl font-bold text-custom-green">
              Manufacturing Excellence
            </motion.h2>
            <motion.h3 variants={itemVariants} className="font-abel text-4xl md:text-5xl font-normal text-custom-black">
              Crafting Excellence, One Product at a Time
            </motion.h3>
            <motion.p variants={itemVariants} className="text-lg font-roboto text-custom-black/80">
              We deliver world-class manufacturing solutions through innovation, precision, and dedication to quality.
            </motion.p>

            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-custom-green p-6 rounded-xl shadow-lg">
                <h4 className="font-rubik text-xl font-medium text-custom-white mb-2">INNOVATIVE TECHNOLOGY</h4>
                <p className="font-abel text-lg text-custom-cream">
                  Our cutting-edge technology ensures unparalleled precision in every step of the manufacturing process.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-custom-green p-6 rounded-xl shadow-lg">
                <h4 className="font-rubik text-xl font-medium text-custom-white mb-2">RELIABILITY</h4>
                <p className="font-abel text-lg text-custom-cream">
                  Trusted by industries worldwide, we consistently deliver products that exceed expectations.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={containerVariants} className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/about"
                className="bg-custom-black text-custom-white px-6 py-3 flex items-center gap-2 font-rubik rounded-[5px] transition-all duration-300 hover:bg-custom-green"
              >
                Learn More <FaAngleRight />
              </Link>
              <Link
                href="/contact"
                className="bg-custom-green text-custom-white px-6 py-3 flex items-center gap-2 font-rubik rounded-[5px] transition-all duration-300 hover:bg-custom-black"
              >
                Contact Us <FaAngleRight />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/qual.webp"
                alt="Manufacturing Excellence"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-custom-green/20 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Quality

