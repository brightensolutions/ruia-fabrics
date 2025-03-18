"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"

const Aboutus = () => {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false })
  const pathname = usePathname()

  React.useEffect(() => {
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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gradient-to-br z-40 from-custom-white via-custom-cream to-custom-green/10 relative overflow-hidden py-24"
    >

           <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-custom-white to-transparent" />
           <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-custom-green/20 rounded-full blur-3xl" />
           <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-custom-green/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Images Section with Overlapping Cards */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative h-[600px]">
            {/* First Image Card */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-0 left-0 z-20 w-[80%] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/fabric/7.jpg" alt="Premium Fabric" fill className="object-cover" />
            </motion.div>

            {/* Second Image Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-0 right-0 z-10 w-[80%] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/fabric/8.jpg" alt="Fabric Detail" fill className="object-cover" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-custom-green/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-custom-green/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content Section */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 space-y-8">
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-rubik font-bold text-custom-black">
              Sustainable trends you'll love forever.
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-custom-black/80 font-abel leading-relaxed">
              Ruia Fabrics is a premier textile solutions provider in Western India, specializing in the manufacturing and trading of a diverse range of high-quality fabrics.With over a decade of industry expertise, we are committed to delivering value-added textile solutions while establishing a strong and distinguished presence in the Indian textile market.
              </p>
              <p className="text-lg text-custom-black/80 font-abel leading-relaxed">
              Our expertise lies in producing premium resort wear fabrics, including 100% cotton, 100% linen, and blends with Lyocell, Modal, and Viscose. We also offer luxurious fabrics such as chiffon, crepe, and georgette, catering to the evolving needs of the fashion industry. Expanding into the realm of luxury clothing, including velvet fabric, Ruia Fabrics continues to set new benchmarks in quality, innovation, and craftsmanship.
              </p>
             
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <Link
                href={pathname === "/" ? "/compnay/about-us" : "/compnay/contact-us"}
                className="inline-flex rounded-[5px] items-center px-8 py-3  bg-custom-green text-white font-rubik text-lg 
                         transition-all duration-300 hover:bg-custom-black hover:scale-105 transform"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Aboutus

