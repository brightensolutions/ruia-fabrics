'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function CompanyInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="min-h-screen bg-white">
      <div 
        className="relative h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/about-company.jpg')`,
          backgroundPosition: 'center 25%'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="font-rubik text-[30px] font-bold text-darkgreen">Mission</h2>
            <p className="text-gray-700 leading-relaxed font-abel">
              To empower people and develop leadership qualities to create a process-impelled company capable of delivering high-quality textile products to the global market. We seek steady growth to lead in both the international and domestic markets, as well as to strengthen our global presence through our continuous urge to innovate new ideologies in the textile industry without compromising on quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="font-rubik text-[30px] font-bold text-darkgreen">Vision</h2>
            <p className="text-gray-700 leading-relaxed font-abel">
              To be one of the country&apos;s leading quality textile manufacturers, from fiber to fabric. To maintain a strong presence in the global textile market and be one of the most esteemed textile companies by adhering to high quality, exceeding the expectations of customers, and practicing a high level of integrity in dealing with all stakeholders.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-xl p-6"
        >
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed font-abel">
              Ruia Fabrics is a family-owned organization whose roots trace back to the textile revolution of 1952 in India. Founded by the late Shri Shubhkaranji Ruia, the company began as Laxmi Narayan Gaurishankar, a yarn merchant trading across India. Over the decades, the family expanded into fabric trading and manufacturing under the name Ruia Brothers, earning a reputation for quality and price competitiveness.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed font-abel">
              In 1990, Madhusudan Ruia established Ruia Fabrics Private Limited, which continues to grow and excel. The company achieved recognition in 2010 by Grasim Industries - Aditya Birla Group, as a certified producer of LIVA viscose fabrics. Since 2018, Ruia Fabrics has been weaving sustainable viscose fabrics, certified for LIVA eco-vera fabrics, producing approximately 200,000 meters monthly.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed font-abel">
              In 2018, Ruia Fabrics launched The Klassiq Silk Mills in Surat, Gujarat, specializing in velvet and viscose fabrics. With 87 machines, the mill produces one lakh meters of micro velvet 9000 fabric monthly. Renowned for quality, The Klassiq Silk Mills serves domestic and international markets with luxurious velvet fabrics such as viscose/rayon velvet, synthetic velvet, and cotton velvet.
            </p>
            <p className="text-gray-700 leading-relaxed font-abel" >
              Committed to sustainability, Ruia Fabrics believes in creating a better tomorrow by innovating and practicing environmentally conscious processes. Their product range includes voile, chiffon, crepes, and georgette fabrics, crafted to meet the unique needs of customers worldwide. The company&apos;s management inspires its workforce to deliver consistent quality, maintaining long-standing relationships with clients and suppliers alike.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}