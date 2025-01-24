import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { TextAnimate } from "./ui/text-animate";

interface ServicesSectionProps {
  image: string;
  title: string;
  description: string;
  link: {
    href: string;
    label: string;
  };
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  image,
  title,
  description,
  link,
}) => {
  return (
    <div
      className="relative bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${image})`,
        height: "100vh",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t md:to-zinc-900/40 to-creamwhite/60 from-creamwhite"></div>

      <div className="relative md:max-w-[1440px] m-auto px-[20px] z-30 ">
        <div className="flex flex-col md:items-center items-end md:justify-center justify-end">
          <h1 className="md:text-[105px] text-[45px] font-rubik font-bold text-darkgreen">
            <TextAnimate animation="blurInUp" by="character" as="p">
              {title}
            </TextAnimate>
          </h1>
          <p className="mt-4 text-[25px] md:text-center text-right font-abel text-black font-bold">{description}</p>
          <div className="w-[100%] ">
            <Link
              href={link.href}
              className="flex flex-row w-fit items-center gap-1 m-auto md:justify-center justify-end  px-4 py-2 bg-zinc-950 mt-4 border rounded-[5px]"
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
  );
};

export default ServicesSection;
