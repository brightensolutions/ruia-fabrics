"use client"

import type React from "react"
import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
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

const AnimatedDetailsAndImage: React.FC<DetailsAndImageProps> = ({
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
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: imagePosition === "right" ? 100 : -100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4 + details.length * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  return (
    <div className={`${bgcolor} ${sectioncolor}`}>
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div
          className={`flex flex-col ${
            imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-12 items-center`}
        >
          <motion.div className="relative flex-1 w-full max-w-2xl" variants={imageVariants}>
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
              <motion.div className="absolute -left-8 -bottom-8 w-2/3" variants={overlayVariants}>
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

          <motion.div className="flex-1" variants={contentVariants}>
            <motion.h1
              className={`font-rubik  text-3xl md:text-4xl font-bold ${titleColor} mb-6`}
              variants={titleVariants}
            >
              {title}
            </motion.h1>
            {details.map((detail, index) => (
              <motion.p
                key={index}
                custom={index}
                variants={paragraphVariants}
                className={`mb-4 text-lg font-abel font-semibold ${paragraphColor} leading-relaxed`}
              >
                {detail.paragraph}
              </motion.p>
            ))}
            {/* <motion.div variants={buttonVariants}>
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
            </motion.div> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnimatedDetailsAndImage
