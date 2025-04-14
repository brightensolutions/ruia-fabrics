"use client"

import Image from "next/image"
import React from "react"
import { motion, useInView, useAnimation } from "framer-motion"

const SustainableFabrics = () => {
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

  const fabrics = [
    {
      id: 1,
      name: "Hemp Fabric",
      image: "/fabric/hemp final.jpeg.jpg",
      icon: "/Manufacturing/home-f-icon-1.png",
      description:
        "Durable and sustainable, hemp requires minimal water and no pesticides to grow. It produces strong, breathable fabrics that improve with each wash.",
    },
    {
      id: 6,
      name: "European Flax",
      image: "/fabric/linen .jpg",
      icon: "/Manufacturing/European flex logo.png",
      description:
        "European Flax is known for  long, strong fibers, contributing to the luxurious feel and durability of linen.",
    },
    {
      id: 2,
      name: "Bamboo Fabric",
      image: "/fabric/bamboo.webp",
      icon: "/Manufacturing/home-f-icon-2.png",
      description:
        "Natural bamboo fiber is extracted without chemicals, offering antibacterial, deodorant properties with excellent elasticity and drapability for high-end light fabrics.",
    },
    {
      id: 3,
      name: "100% Organic Cotton",
      image: "/fabric/cotton 2.jpg",
      icon: "/Manufacturing/home-f-icon-3.png",
      description:
        "Grown without harmful chemicals, organic cotton creates soft, hypoallergenic fabrics while protecting farmer health and reducing environmental impact.",
    },
    // {
    //   id: 4,
    //   name: "Aloe Vera Fabric",
    //   image: "/fabric/aloe-vera-fabric.jpg",
    //   icon: "/Manufacturing/home-f-icon-4.png",
    //   description:
    //     "Infused with aloe vera extract, these fabrics offer natural moisturizing properties, are gentle on skin, and provide cooling comfort with antibacterial benefits.",
    // },
    {
      id: 5,
      name: "Tencel Fabric",
      image: "/fabric/image.png",
      icon: "/Manufacturing/home-f-icon-5.png",
      description:
        "Made from sustainable wood pulp using nanotechnology, Tencel is fully biodegradable, moisture-absorbent, antibacterial, and creates vibrant, breathable fabrics.",
    },
    
  ]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gradient-to-br from-custom-white to-custom-green/5 relative overflow-hidden py-24"
    >
      {/* Decorative elements */}
      <div className="absolute -left-20 top-1/3 w-40 h-40 bg-custom-green/10 rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-1/3 w-40 h-40 bg-custom-green/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sustainability Quote Section */}
        <motion.div variants={itemVariants} className="mb-20 max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-custom-green opacity-40"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-custom-green opacity-40"></div>

          <h2 className="text-4xl lg:text-5xl font-rubik font-bold text-custom-black mb-8">Sustainable Style, Woven with Care.</h2>

          <p className="text-xl text-custom-black font-abel font-semibold  leading-relaxed ">
            "Sustainability for us means creating long-term value for people, the planet, and shared prosperity. It’s not just about doing good—it’s about making a lasting impact through every choice we make."
          </p>
          <p className="text-lg text-custom-black font-semibold font-abel mt-4">
          Our Responsible For framework reflects our commitment to mindful sourcing, ethical production, and conscious decision-making—ensuring every fabric is crafted with purpose and care.
          </p>
        </motion.div>

        {/* Sustainable Fabrics Title */}
        {/* <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-rubik font-bold text-custom-black">
            Various Fibres and Yarns We Use
          </h2>
          <p className="mt-4 text-lg text-custom-black/70 font-abel max-w-3xl mx-auto">
            We carefully select sustainable materials that minimize environmental impact while maximizing quality and
            comfort.
          </p>
        </motion.div> */}

        {/* Open Layout for All Fabrics */}
        <div className="space-y-16">
          {fabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              {/* Fabric Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={fabric.image || "/placeholder.svg"}
                    alt={fabric.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Fabric Content */}
              <div className="w-full lg:w-1/2 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src={fabric.icon || "/placeholder.svg"}
                      alt={fabric.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-rubik font-bold text-custom-black">{fabric.name}</h3>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-12 h-1  bg-custom-green"></div>
                  <p className="text-lg text-custom-black/80 font-roboto font-semibold leading-relaxed pt-6">{fabric.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Sustainable Practices */}
        {/* <motion.div variants={itemVariants} className="mt-20 text-center">
          <div className="inline-block px-6 py-3 border border-custom-green/30 rounded-full text-custom-green font-rubik mb-8">
            Committed to Sustainability
          </div>
          <p className="text-lg text-custom-black/80 font-abel leading-relaxed max-w-3xl mx-auto">
            Beyond our fabric choices, we implement sustainable practices throughout our production process, from water
            conservation and waste reduction to ethical labor practices and community support.
          </p>
        </motion.div> */}
      </div>
    </motion.div>
  )
}

export default SustainableFabrics


