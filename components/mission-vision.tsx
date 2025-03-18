"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CompanyInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className=" bg-white mb-14">
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/about-company.jpg')`,
          backgroundPosition: "center 25%",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="font-rubik text-[30px] font-bold text-darkgreen">
              Our Legacy{" "}
            </h2>
            <p className="text-gray-700 leading-relaxed font-abel">
              As a third-generation family business, our journey in the textile
              industry began over five decades ago with a strong foundation in
              fabric trading. Initially, we sourced yarn and fabrics from
              leading mills across India, supplying to both the local and export
              markets.
            </p>
            <br />
            <p className="text-gray-700 leading-relaxed font-abel">
              In 1991, we took a significant step forward by establishing Ruia
              Fabrics Pvt. Ltd., specializing in the manufacturing and trading
              of viscose fabrics. Our first state-of-the-art manufacturing unit
              was set up in Surat, Gujarat, marking our entry into large-scale
              fabric production.
            </p>
            <br />
            <p className="text-gray-700 leading-relaxed font-abel">
              With a vision for innovation and sustainability, we expanded our
              portfolio in 2004, introducing linen and eco-friendly fabrics such
              as EcoVero, LivaEco, BCI Cotton, and European Flax.
            </p>
            <br />
            <p className="text-gray-700 leading-relaxed font-abel">
              In 2017, we established Klassiq Silk Mills in Surat to manufacture
              premium velvet fabrics, with an annual production capacity of 18
              lakh meters. This facility features an end-to-end production
              process, from sizing to finishing, ensuring the highest quality
              standards.
            </p>
            <br />
            <p className="text-gray-700 leading-relaxed font-abel">
              From our humble beginnings in 1960 to our evolution into a leader
              in sustainable and luxury textiles, our legacy is built on
              craftsmanship, innovation, and a commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="font-rubik text-[30px] font-bold text-darkgreen">
              Vision
            </h2>
            <p className="text-gray-700 leading-relaxed font-abel">
              To be recognized as one of the leading textile producers in the
              country, committed to quality, sustainability, and innovation. We
              aim to establish a strong global presence in the textile industry
              while upholding the highest standards of craftsmanship.
            </p><br/>
            <p className="text-gray-700 leading-relaxed font-abel">
              Our goal is to exceed customer expectations by delivering premium,
              sustainable fabrics and to be among the most esteemed textile
              companies by maintaining integrity, transparency, and excellence
              in all our stakeholder relationships.
            </p>
          </motion.div>
        </div>

        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
  );
}
