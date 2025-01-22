import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa";
import { TextAnimate } from "./ui/text-animate";

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
}

const AnimatedDetailsAndImage: React.FC<DetailsAndImageProps> = ({
  title,
  titleColor = "text-blue-600",
  details,
  paragraphColor = "text-gray-700",
  images,
  imagePosition = "right",
  connectUsLink = "/compnay/contact-us",
  bgcolor = "bg-white",
  sectioncolor
}) => {
  return (
    <div className={`${bgcolor} ${sectioncolor}`}>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div
        className={`flex flex-col ${
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-12 items-center`}
      >
        <motion.div
          className="relative flex-1 w-full max-w-2xl"
          initial={{ opacity: 0, x: imagePosition === "right" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Image
              src={images.main || "/placeholder.svg"}
              alt="Main Image"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </motion.div>
          {images.overlay && (
            <motion.div
              className="absolute -left-8 -bottom-8 w-2/3"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={images.overlay || "/placeholder.svg"}
                alt="Overlay Image"
                width={300}
                height={400}
                className=" border-4 border-white/30 rounded-lg shadow-xl"
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className={`text-4xl font-rubik font-bold mb-6 ${titleColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <TextAnimate animation="blurInDown" by="character" as="p">{title}</TextAnimate>
            
          </motion.h1>
          {details.map((detail, index) => (
            <motion.p
              key={index}
              className={`mb-4 text-lg font-abel ${paragraphColor} leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              {detail.paragraph}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + details.length * 0.1, duration: 0.6 }}
          >
            <Link href={connectUsLink} passHref>
              <motion.p
                className="flex flex-row items-center w-fit gap-[5px] mt-6 px-6 py-3 bg-greycolor text-white font-semibold rounded-lg shadow-md hover:bg-greencolor/50 hover:text-textblak transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Us <span className="text-[12px]"><FaChevronRight /></span>
              </motion.p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </div>
  )
}

export default AnimatedDetailsAndImage

