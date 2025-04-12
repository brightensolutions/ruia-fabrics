"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function PremiumTimeline() {
  const containerRef = useRef(null)

  // Timeline events
  const timelineEvents = [
    {
      year: "1960",
      title: "Our Beginnings",
      description:
        "Our journey in the textile industry began over five decades ago with a strong foundation in fabric trading, sourcing yarn and fabrics from leading mills across India.",
      color: "#2c5e3f",
    },
    {
      year: "1991",
      title: "Ruia Fabrics Established",
      description:
        "We established Ruia Fabrics Pvt. Ltd., specializing in the manufacturing and trading of Viscose, Cotton And linen fabrics  with our first state-of-the-art manufacturing unit in Surat, Gujarat.",
      color: "#d3a456",
    },
    {
      year: "2004",
      title: "Sustainable Innovation",
      description:
        "With a vision for innovation and sustainability, we expanded our portfolio, introducing linen and eco-friendly fabrics such as EcoVero, LivaEco, BCI Cotton, and European Flax.",
      color: "#5e2c4f",
    },
    {
      year: "2017",
      title: "The Klassiq Silk Mills",
      description:
        "We established The Klassiq Silk Mills in Surat to manufacture premium velvet fabrics, with an annual production capacity of 18 lakh meters, featuring an end-to-end production process.",
      color: "#2c4e5e",
    },
    {
      year: "Present",
      title: "Global Excellence",
      description:
        "From our humble beginnings to our evolution into a leader in sustainable and luxury textiles, our legacy continues with craftsmanship, innovation, and a commitment to excellence.",
      color: "#5e452c",
    },
  ]

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-custom-white py-20">
      {/* Decorative fabric texture background */}
      {/* <div className="absolute inset-0 opacity-5">
        <Image src="/images/fabric-texture.jpg" alt="Fabric texture" fill className="object-cover" />
      </div> */}

      {/* Floating decorative elements */}
      <FloatingElement
        className="absolute top-20 left-10 w-40 h-40 rounded-full border border-[#2c5e3f]/20"
        animationProps={{
          y: [0, 20, 0],
          rotate: [0, 5, 0],
        }}
        duration={10}
      />

      <FloatingElement
        className="absolute bottom-40 right-10 w-60 h-60 rounded-full border border-[#d3a456]/20"
        animationProps={{
          y: [0, -30, 0],
          rotate: [0, -8, 0],
        }}
        duration={15}
      />

      <FloatingElement
        className="absolute top-1/3 right-20 w-24 h-24 rounded-full border border-[#5e2c4f]/20"
        animationProps={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        duration={8}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-serif text-[#2c5e3f] mb-6">
            Our Rich Heritage
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-[#d3a456] mx-auto mb-6"
          />
          <p className="text-lg md:text-xl font-abel font-semibold text-gray-700 max-w-3xl mx-auto">
            A legacy of excellence in textiles spanning three generations and over five decades of innovation
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute left-0 md:left-[80px] top-0 bottom-0 w-[2px] bg-[#d3a456]/30" />

        <div className="relative pl-8 md:pl-[160px]">
          {timelineEvents.map((event, index) => (
            <FabricTimelineEvent
              key={index}
              year={event.year}
              title={event.title}
              description={event.description}
              color={event.color}
              delay={index * 0.15}
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-16 -left-16 w-32 h-32 border border-[#d3a456]/30 rounded-full" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 border border-[#2c5e3f]/30 rounded-full" />

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2c5e3f] mb-6">Our Vision</h2>
                <div className="w-16 h-1 bg-[#d3a456] mb-6" />
                <p className="text-gray-700 leading-relaxed mb-6 font-roboto font-semibold">
                  To be recognized as one of the leading textile producers in the country, committed to quality,
                  sustainability, and innovation. We aim to establish a strong global presence in the textile industry
                  while upholding the highest standards of craftsmanship.
                </p>
                <p className="text-gray-700 leading-relaxed font-roboto font-semibold">
                  Our goal is to exceed customer expectations by delivering premium, sustainable fabrics and to be among
                  the most esteemed textile companies by maintaining integrity, transparency, and excellence in all our
                  stakeholder relationships.
                </p>
              </div>

              <div className="relative h-[300px] md:h-auto">
                <Image src="/company/014A7656.JPG" alt="Our vision" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-l" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:hidden">
                  <h3 className="text-2xl font-serif text-white mb-2">Crafting Tomorrow's Textiles</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface FloatingElementProps {
  className: string
  animationProps: {
    y: number[]
    rotate: number[]
  }
  duration: number
}

function FloatingElement({ className, animationProps, duration }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={animationProps}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Also add proper type definitions for the FabricTimelineEvent component:

interface FabricTimelineEventProps {
  year: string
  title: string
  description: string
  color: string
  delay: number
  isLast: boolean
}

// Fabric-inspired timeline event
function FabricTimelineEvent({ year, title, description, color, delay, isLast }: FabricTimelineEventProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div className={`relative ${isLast ? "" : "mb-16"}`}>
      {/* Year marker with thread effect */}
      <div className="absolute left-0 md:left-[-160px] top-0 flex items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay,
          }}
          className="relative"
        >
          {/* Thread connecting to timeline */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 40 } : { width: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            className="absolute top-1/2 right-full h-[2px] -translate-y-1/2 mr-2"
            style={{ backgroundColor: color }}
          />

          {/* Year bubble */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg relative z-10"
            style={{ backgroundColor: color }}
          >
            {/* Pulsing effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <span className="relative z-10">{year}</span>
          </div>
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.5, delay }}
        className="relative bg-white rounded-xl p-6 shadow-xl border-l-4 hover:shadow-2xl transition-all duration-300"
        style={{ borderLeftColor: color }}
      >
        {/* Fabric texture overlay */}
        <div
          className="absolute inset-0 opacity-5 rounded-xl overflow-hidden pointer-events-none"
          style={{
            backgroundImage: `url('/images/fabric-texture.jpg')`,
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
            backgroundColor: `${color}10`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold font-abel mb-3" style={{ color }}>
            {title}
          </h3>

          <p className="text-gray-700 font-roboto font-normal leading-normal text-xl">{description}</p>
        </div>

        {/* Decorative thread corner */}
        <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
          <div
            className="absolute bottom-0 right-0 w-24 h-24 -rotate-45 transform origin-bottom-right opacity-10"
            style={{ backgroundColor: color }}
          />
        </div>
      </motion.div>

      {/* Connecting thread to next event */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: 40 } : { height: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
          className="absolute left-[-80px] ml-8 top-full w-[2px]"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  )
}
