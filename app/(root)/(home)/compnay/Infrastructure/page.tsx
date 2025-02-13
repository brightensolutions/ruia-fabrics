"use client"
import ServicesSection from "@/components/ServicesSectionFn"
import Image from "next/image"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"
import { motion } from "framer-motion"

const Infrastructure = () => {
  const greyFabric = {
    title: "Weaving Preparatory",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "To convert spun yarns into high-quality warp beams, our sizing machines are distinguished by their ease of operation and precise process control. The sized warp beams ensure maximum weaving efficiency. For sizing, we have 2 Karl Mayer Machines and also supply high-quality sized beams based on customers' weaving loom needs.",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/weaving-preparatory (1).webp",
    },
    connectUsLink: "/compnay/contact-us",
  }

  const greyFabric2 = {
    title: "Weaving",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "Our in-house weaving unit is equipped with 254 Airjet looms that can produce high-quality woven fabrics.",
      },
      {
        paragraph:
          "We can produce woven strands that can be twisted into various patterns through our Weaving Division.",
      },
      {
        paragraph:
          "Following yarn selection, the amount of warp required for the fabric is calculated, and our expert technicians monitor the warping process for any flaws, mending imperfections.",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/infra-weaving.webp",
    },
    connectUsLink: "/compnay/contact-us",
  }

  return (
    <div className="bg-custom-cream">
      <ServicesSection
        image="/images/banner1.webp"
        title="Infrastructure"
        description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we're here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-custom-white py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            src="/images/services-detail-img.jpg"
            alt="fabric"
            width={800}
            height={800}
            className="object-cover w-full md:w-4/5 h-[350px] md:h-[500px] mx-auto rounded-lg shadow-2xl"
          />
        </div>
      </motion.div>

    <div className="bg-custom-green">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 "
      >
        <section className="text-center md:text-left ">
          <h4 className="font-rubik text-3xl md:text-4xl font-bold text-custom-white mb-4">Infrastructure</h4>
          <h2 className="font-abel text-3xl md:text-5xl font-normal text-custom-cream mb-6">Spinning</h2>
          <p className="text-xl md:text-2xl font-abel text-custom-white/80 mb-4">
            We stand committed to the business values and ethics in every product we turn out!
          </p>
          <p className="text-xl md:text-2xl font-abel text-custom-white/80">
            Our spinning division produces 160 tons of yarn daily through 1,30,000 spindles, providing a diverse range
            of yarns.
          </p>
        </section>
      </motion.div>
    </div>

      <AnimatedDetailsAndImage {...greyFabric} imagePosition="left" />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-custom-white py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-rubik text-3xl md:text-4xl font-bold text-custom-green mb-6">About Ruia Fabrics</h2>
          <p className="text-lg md:text-xl font-roboto text-custom-black/80 leading-relaxed mb-6">
            Ruia Fabrics, established during the textile revolution of 1952, is a family-owned enterprise known for its
            high-quality velvet and viscose fabrics. It has evolved under the guidance of Shri Shubhkaranji Ruia and his
            entrepreneurial family.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-roboto text-custom-black/80 space-y-2">
            <li>Certified by Grasim Industries (Aditya Birla Group).</li>
            <li>Produces 200,000 meters/month of LIVA eco-vera fabrics.</li>
            <li>Known for sustainable practices since 2018.</li>
          </ul>
        </div>
      </motion.section>

      <AnimatedDetailsAndImage {...greyFabric2} imagePosition="right" />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-custom-cream py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-rubik text-3xl md:text-4xl font-bold text-custom-green mb-6">The Klassiq Silk Mills</h2>
          <p className="text-lg md:text-xl font-roboto text-custom-black/80 leading-relaxed mb-6">
            Based in Surat, Gujarat, The Klassiq Silk Mills specializes in velvet and viscose fabrics, with a monthly
            production capacity of three lakh meters. Our state-of-the-art infrastructure ensures top-quality products
            for both fashion and interior industries.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-roboto text-custom-black/80 space-y-2">
            <li>Viscose/Rayon Velvet</li>
            <li>Synthetic Velvet</li>
            <li>Cotton Velvet</li>
          </ul>
        </div>
      </motion.section>
    </div>
  )
}

export default Infrastructure

