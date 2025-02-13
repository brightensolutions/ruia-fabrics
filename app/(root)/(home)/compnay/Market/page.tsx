"use client"

import ServicesSection from "@/components/ServicesSectionFn"
import { Building2, Factory, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn"
import { TextAnimate } from "@/components/ui/text-animate"
import { motion } from "framer-motion"

const Market = () => {
  const greyFabric2 = {
    title: "Domestic Excellence",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "With a 90% presence in the Indian market, we manufacture high-quality technical textiles that are supplied to hubs in Delhi, Jaipur, Ahmedabad, and Mumbai.",
      },
      {
        paragraph:
          "Creating bespoke solutions, we understand our clients' unique requirements and deliver customized textiles perfect for complex applications and industries.",
      },
      {
        paragraph:
          "Not only have we earned the trust of our Indian clients, but we have also reached an international clientele with our premium products.",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/infra-weaving.webp",
    },
    connectUsLink: "/company/contact-us",
  }

  const greyFabric = {
    title: "Export Excellence",
    titleColor: "text-custom-green",
    details: [
      {
        paragraph:
          "Ruia Fabrics has built a strong global presence, with a clientele spanning countries such as Egypt, Morocco, Italy, Nepal, Hong Kong, Brazil, Argentina, Sri Lanka, Germany, and across Europe. Our legacy in textiles is rooted in quality, innovation, and sustainable practices.",
      },
      {
        paragraph:
          "10% of our products are directly exported to markets like Sri Lanka, Bangladesh, Korea, and select European nations. We take pride in crafting premium-quality fabrics like velvet, viscose, georgette, crepe, and chiffon, catering to diverse industries and applications.",
      },
      {
        paragraph:
          "Ruia Fabrics traces its roots back to 1952 during the Indian textile revolution. Founded by Shri Shubhkaranji Ruia, it began as a yarn trading enterprise. Today, it has evolved into a global textile powerhouse, renowned for its quality, sustainability, and innovation.",
      },
      {
        paragraph:
          "Our portfolio includes viscose rayon velvet, synthetic velvet, and cotton velvet, ideal for a variety of applications from resort wear to evening gowns. With state-of-the-art infrastructure and expertise, we ensure unmatched quality and precision.",
      },
      {
        paragraph:
          "We are committed to sustainable practices, producing eco-friendly fabrics in collaboration with Aditya Birla Group. Our LIVA eco-vera certified fabrics highlight our dedication to a greener future.",
      },
    ],
    paragraphColor: "text-custom-black/80",
    images: {
      main: "/images/infra-weaving.webp",
    },
    connectUsLink: "/company/contact-us",
  }

  return (
    <div className="bg-custom-cream">
      <ServicesSection
        image="/images/banner1.webp"
        title="Market"
        description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we're here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
        link={{ href: "/company/contact-us", label: "Contact Us" }}
      />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="mb-12">
          <h2 className="font-rubik text-3xl md:text-4xl font-bold text-custom-green mb-4">
            <TextAnimate animation="blurInUp" by="character" as="p">
              Who We Are
            </TextAnimate>
          </h2>
          <p className="text-custom-black/80 max-w-3xl font-roboto text-lg">
            VP Tex is a diverse business group based in Erode, South India, that specializes in spinning & weaving for
            arduous applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-8 rounded-lg bg-custom-white shadow-lg">
            <div className="flex justify-center mb-4">
              <Building2 className="w-16 h-16 text-custom-green" />
            </div>
            <h3 className="font-rubik text-3xl font-bold text-custom-green mb-2">90 Lakhs</h3>
            <div className="uppercase text-sm text-custom-black/70 font-abel">
              <div>WOVEN FABRICS</div>
              <div>METRES / MONTH</div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center p-8 rounded-lg bg-custom-white shadow-lg">
            <div className="flex justify-center mb-4">
              <Factory className="w-16 h-16 text-custom-green" />
            </div>
            <h3 className="font-rubik text-3xl font-bold text-custom-green mb-2">6 Tons</h3>
            <div className="uppercase text-sm text-custom-black/70 font-abel">
              <div>KNITTED FABRICS</div>
              <div>TONS / DAY</div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="bg-custom-green text-custom-white p-8 shadow-xl">
            <CardContent className="p-0">
              <h3 className="font-rubik text-3xl font-bold mb-6">
                <TextAnimate animation="blurInDown" by="character" as="p">
                  Our Mission
                </TextAnimate>
              </h3>
              <div className="space-y-6 font-roboto">
                <p>
                  V.P. Tex has been best known for quality for more than three decades, combining expertise with a
                  passion for excellence to provide high quality material to the specification of our clients. We are
                  dedicated to meeting the needs of all of our stakeholders, which include our customers, employees,
                  partners, and the general public.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="block w-4 h-0.5 bg-custom-white mt-3 flex-shrink-0" />
                    <span>
                      To produce world class-quality fabric and yarn with the highest level of competitiveness across
                      all parameters
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="block w-4 h-0.5 bg-custom-white mt-3 flex-shrink-0" />
                    <span>
                      To have long-standing customers by delivering sustainable fabric and yarn as per the client needs.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="block w-4 h-0.5 bg-custom-white mt-3 flex-shrink-0" />
                    <span>
                      To effectively harness and integrate all available technology across various elements of the
                      textile chain, and to cater to product innovation by mastering value-added fabric
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-custom-white rounded-lg shadow-lg p-8">
              <div className="flex gap-4 items-center">
                <div className="flex items-center">
                  <span className="font-rubik text-5xl font-bold text-custom-green">25</span>
                  <span className="text-custom-black text-2xl ml-2 font-abel">Years</span>
                </div>
                <p className="text-custom-black/80 text-xl font-roboto">Industries Experience</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-custom-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <Factory className="w-8 h-8 text-custom-green" />
                <h4 className="font-rubik text-2xl font-bold text-custom-green">Production</h4>
              </div>
              <ul className="space-y-2 text-custom-black/80 font-roboto">
                <li>Woven Fabrics : 90 Lakh Metres / Month</li>
                <li>Knitted Fabric : 6 Tons / day</li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-custom-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-8 h-8 text-custom-green" />
                <h4 className="font-rubik text-2xl font-bold text-custom-green">Professional Team</h4>
              </div>
              <p className="text-custom-black/80 font-roboto">
                A versatile production & management team that is willing to go beyond in its pursuit of quality and
                delicacy.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <AnimatedDetailsAndImage {...greyFabric2} imagePosition="left" />
      <AnimatedDetailsAndImage {...greyFabric} imagePosition="right" />
    </div>
  )
}

export default Market

