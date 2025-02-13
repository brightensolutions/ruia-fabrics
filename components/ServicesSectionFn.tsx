import Link from "next/link"
import type React from "react"
import { FaChevronRight } from "react-icons/fa"
import { TextAnimate } from "./ui/text-animate"

interface ServicesSectionProps {
  image: string
  title: string
  description: string
  link: {
    href: string
    label: string
  }
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ image, title, description, link }) => {
  return (
    <div
      className="relative bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${image})`,
        height: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t md:to-custom-green/40 to-custom-cream/60 from-custom-cream"></div>

      <div className="relative md:max-w-[1440px] m-auto px-[20px] z-30 ">
        <div className="flex flex-col md:items-center items-end md:justify-center justify-end">
          <h1 className="md:text-[105px] text-[45px] font-rubik font-bold text-custom-green">
            <TextAnimate animation="blurInUp" by="character" as="p">
              {title}
            </TextAnimate>
          </h1>
          <p className="mt-4 text-[25px] leading-snug md:text-center text-right  text-custom-black font-bold">
            {description}
          </p>
          <div className="mt-8">
            <Link
              href={link.href}
              className="flex flex-row w-fit md:items-center items-end gap-1 m-auto justify-end md:justify-center  px-4 py-2 bg-custom-green text-custom-white mt-4 border rounded-[5px] font-rubik hover:bg-custom-black transition-colors duration-300"
            >
              {link.label}
              <span>
                <FaChevronRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesSection

