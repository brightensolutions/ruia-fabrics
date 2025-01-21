import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

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
      <div className="absolute inset-0 bg-gradient-to-t to-zinc-900/40 from-white"></div>

      <div className="relative md:max-w-[1440px] m-auto px-[20px] z-30 ">
        <div className="text-center m-auto">
          <h1 className="md:text-[105px] font-rubik font-bold text-greencolor">{title}</h1>
          <p className="mt-4 text-[25px] font-abel text-textblak">{description}</p>
          <div>
            <Link
              href={link.href}
              className="flex flex-row items-center gap-1 m-auto justify-center w-fit px-4 py-2 bg-zinc-950 mt-4 border rounded-[5px]"
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