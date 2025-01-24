"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const Aboutus = () => {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false })

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
      className="bg-gradient-to-t to-creamwhite pt-[45px] from-white"
    >
      <div className="lg:max-w-[1440px] px-[20px] m-auto py-[50px]">
        <div className="flex flex-col xl:flex-row my-[50px] lg:my-[100px] relative">
          <motion.div
            variants={itemVariants}
            className="w-full xl:w-[50%] flex flex-row justify-between items-end space-x-5 mb-8 lg:mb-0"
          >
            <Image
              src="/images/about-us1.jpg"
              alt="About Us"
              className="w-full lg:w-[80%] m-auto border-[2px] rounded-[5px] rounded-b-none border-white"
              width={400}
              height={400}
            />
            <div className="hidden lg:block absolute left-1/4 top-1/2 transform -translate-y-1/2">
              <Image
                src="/images/about-us1.jpg"
                alt="About Us"
                className="w-full m-auto border-[2px] rounded-[5px] rounded-b-none border-white"
                width={200}
                height={200}
              />
            </div>
          </motion.div>

          <div  className="w-full xl:w-[50%] bg-greycolor p-5 rounded-[5px]">
            <div className="p-5 border-lightgreen border-[1px]">
              <h1  className="font-rubik text-[30px] font-bold text-white mb-5">
                <TextAnimate animation="blurIn" as="h1">
                  About Us
                </TextAnimate>
              </h1>

              <div >
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 font-abel text-[18px] lg:text-[20px] leading-[1.8] mb-[10px]"
                >
                  Ruia Fabrics is a family-owned organization established in 1952 by the late Shri Shubhkaranji Ruia,
                  who began as a yarn merchant trading across India. Over decades, the company evolved, expanding into
                  fabric trading and manufacturing. In 1990, Madhusudan Ruia founded Ruia Fabrics Private Limited,
                  focusing on quality and innovation in fabrics.
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 font-abel text-[18px] lg:text-[20px] leading-[1.8] mb-[10px]"
                >
                  Today, Ruia Fabrics specializes in sustainable practices, weaving eco-friendly viscose fabrics in
                  collaboration with the Aditya Birla Group. The company produces over 200,000 meters of LIVA eco-vera
                  fabrics monthly, adhering to its commitment to sustainability and quality.
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 font-abel text-[18px] lg:text-[20px] leading-[1.8] mb-[10px]"
                >
                  In 2018, Ruia Fabrics expanded further with Klassiq Silk Mills in Surat, importing advanced velvet
                  manufacturing machines to produce luxurious micro velvet fabrics. With a monthly capacity of one lakh
                  meters, Klassiq Silk Mills has established a robust distribution network across India and the Middle
                  East, meeting the highest standards of quality and design.
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 font-abel text-[18px] lg:text-[20px] leading-[1.8] mb-[10px]"
                >
                  Guided by a futuristic vision, Ruia Fabrics has become a world-class manufacturer, providing voile,
                  chiffon, crepes, and georgette fabrics for both domestic and international markets. Sustainability and
                  ethical practices remain at the heart of its operations, ensuring a better future for people and the
                  planet.
                </motion.p>
              </div>

              <div >
                <Link
                  href="/"
                  className="font-rubik bg-white/35 py-2 inline-block px-7 rounded-[5px] border border-white/15 hover:bg-white/50 transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Aboutus

