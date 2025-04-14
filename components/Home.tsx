"use client"
import { InfiniteMovingCards } from "./ui/nfinite-moving-cards"
import { motion } from "framer-motion"
import Link from "next/link"
import "react-toastify/dist/ReactToastify.css"
import { Skeleton } from "@/components/ui/skeleton"



export function InfiniteMovingCardsDemo() {
  return (
    <div className="relative bg-white z-40 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-32 pt-9 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-rubik font-bold mb-6 bg-gradient-to-r from-custom-green to-custom-black bg-clip-text text-transparent">
            Welcome To Ruia Fabrics
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:max-w-[90%] w-full mx-auto"
          >
            <p className="text-lg sm:text-2xl text-custom-black font-semibold font-abel mb-6 leading-relaxed">
            Ruia Fabrics is a premier textile solutions provider based in Western India, specializing in the manufacturing and trading of a diverse range of high-quality fabrics. With over a decade of industry expertise, we are committed to delivering value-added textile solutions while building a strong and distinguished presence in the Indian textile market.
            </p>
            <p className="text-lg sm:text-2xl text-custom-black font-semibold font-abel mb-12 leading-relaxed">
            Our core expertise lies in producing premium resort wear fabrics, including 100% Cotton, 100% Linen, and Blends with Lyocell, Modal, and Viscose. We also offer luxurious fabrics such as Chiffon, Crepe, and Georgette, catering to the evolving needs of the fashion industry. With our expansion into luxury textiles—particularly Velvet—Ruia Fabrics continues to set new benchmarks in quality, innovation, and craftsmanship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-6"
          >
            <Link
              href="/compnay/about-us"
              className="inline-flex items-center px-8 py-3 rounded-[5px] bg-custom-green text-custom-white font-semibold font-rubik text-lg 
                       transition-all duration-300  transform"
            >
              About Us
            </Link>
            <Link
              href="/compnay/contact-us"
              className="inline-flex items-center px-8 py-3 rounded-[5px] border-2 border-custom-green font-semibold text-white  font-rubik text-lg 
                       transition-all duration-300 bg-custom-green  hover:scale-105 transform"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

       
      </div>
    </div>
  )
}
