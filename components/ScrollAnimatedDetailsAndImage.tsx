"use client"

import type React from "react"
import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa"

interface DetailsAndImageProps {
  title: string
  titleColor?: string
  details: { paragraph: string }[]
  paragraphColor?: string
  images: {
    main: string
    overlay?: string
  }
  imagePosition?: "left" | "right"
  connectUsLink?: string
  bgcolor?: string
  sectioncolor?: string
  btncolor?: string
}

const ScrollAnimatedDetailsAndImage: React.FC<DetailsAndImageProps> = ({
  title,
  titleColor = "text-custom-green",
  details,
  paragraphColor = "text-custom-black/80",
  images,
  imagePosition = "right",
  connectUsLink = "/company/contact-us",
  bgcolor = "bg-custom-white",
  sectioncolor,
  btncolor = "bg-custom-green",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // For parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform values for parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // For the overlay image
  const overlayScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const overlayY = useTransform(scrollYProgress, [0, 1], [80, -20])

  return (
    <div className={`${bgcolor} ${sectioncolor} overflow-hidden`}>
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className={`flex flex-col ${
            imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 items-center`}
        >
          <motion.div
            className="relative flex-1 w-full max-w-2xl"
            style={{
              opacity,
              y: imageY,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src={images.main || "/placeholder.svg"}
                alt="Main Image"
                width={1000}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            {images.overlay && (
              <motion.div
                className="absolute -left-8 -bottom-8 w-2/3"
                style={{
                  scale: overlayScale,
                  y: overlayY,
                }}
              >
                <Image
                  src={images.overlay || "/placeholder.svg"}
                  alt="Overlay Image"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-xl border-4 border-custom-white/30"
                />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="flex-1"
            style={{
              opacity,
              y: contentY,
            }}
          >
            <motion.h1
              className={`font-rubik text-3xl md:text-4xl font-bold ${titleColor} mb-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {title}
            </motion.h1>

            {details.map((detail, index) => (
              <motion.p
                key={index}
                className={`mb-4 text-lg font-abel ${paragraphColor} leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {detail.paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + details.length * 0.1 }}
            >
              <Link href={connectUsLink} passHref>
                <motion.p
                  className={`flex flex-row items-center w-fit gap-[5px] mt-6 px-6 py-3 ${btncolor} text-custom-white font-rubik font-semibold rounded-lg shadow-md hover:bg-custom-black transition duration-300 ease-in-out`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Us{" "}
                  <span className="text-[12px]">
                    <FaChevronRight />
                  </span>
                </motion.p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ScrollAnimatedDetailsAndImage
