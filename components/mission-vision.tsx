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
        "Our journey in the textile industry began over five decades ago, rooted in a strong foundation of fabric trading. We specialized in sourcing premium yarns and fabrics from leading mills across India.",
      color: "#2c5e3f",
    },
    {
      year: "1991",
      title: "Ruia Fabrics Established",
      description:
        "Ruia Fabrics Pvt. Ltd. was established with a focus on manufacturing and trading high-quality viscose, cotton, and linen fabrics. Our first state-of-the-art manufacturing facility is located in Surat, Gujarat.",
      color: "#d3a456",
    },
    {
      year: "2004",
      title: "Sustainable Innovation",
      description:
        "Driven by a vision for innovation and sustainability, we expanded our portfolio to include linen and eco-friendly fabrics such as EcoVero,LivaEco, Bci Cotton, Organic Cotton and European Flax.",
      color: "#5e2c4f",
    },
    {
      year: "2017",
      title: "The Klassiq Silk Mills",
      description:
        "Further expanding our capabilities, we developed The Klassiq Silk Mills in Surat to manufacture premium Velvet fabrics. With a current monthly production capacity exceeding 200,000 meters, the facility features a fully integrated, end-to-end production process.",
      color: "#2c4e5e",
    },
    {
      year: "Present",
      title: "Global Excellence",
      description:
        "From humble beginnings to our evolution as a leader in sustainable and luxury textiles, our legacy is defined by craftsmanship, innovation, and an unwavering commitment to excellence.",
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
        className="absolute bottom-40 right-10 w-60 h-60 rounded-full border border-[#d3a456]/20"
        animationProps={{
          y: [0, -30, 0],
          rotate: [0, -8, 0],
        }}
        duration={15}
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
          <p className="text-lg md:text-xl font-abel font-semibold text-gray-700 max-w-3xl mx-auto">
          A legacy of textile excellence rooted in innovation, craftsmanship, and a commitment to quality.
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
          

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2c5e3f] mb-6">Our Vision</h2>
                
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
          {/* Year bubble */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg relative z-10"
            style={{ backgroundColor: color }}
          >
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

       
      </motion.div>

      
    </div>
  )
}
