"use client";

import React from "react";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

const OurServices: React.FC = () => {
  const services: Service[] = [
    {
      title: "Spinning Division",
      description: "$1299 / night",
      imageUrl: "/Images/Spinning.png",
    },
    {
      title: "Sizing Division",
      description: "$1599 / night",
      imageUrl: "/Images/weaving-preparatory.webp",
    },
    {
      title: "Weaving Division",
      description: "$899 / night",
      imageUrl: "/Images/infra-weaving.webp",
    },
  ];

  return (
    <div className="bg-greencolor">
      <div className="lg:max-w-[1440px] m-auto px-[20px] py-14">
        <div className="text-center">
          <h3 className="text-[30px] font-rubik font-medium">OUR SERVICES</h3>
          <h2 className="text-[40px] font-abel">Textile is What We Do</h2>
          <p className="w-[70%] m-auto font-roboto">
            Ruia Fabrics is a legacy in textiles, rooted in India's rich history
            since 1952. From being a yarn merchant to a global fabric
            manufacturer, we've embraced change and innovation. We produce
            voile, chiffon, crepe, and georgette fabrics, catering to both
            domestic and international markets. Sustainability is at our core,
            collaborating with Aditya Birla Group to produce eco-friendly
            fabrics like LIVA and LIVA EcoVera.
          </p>
        </div>

        <div className="pb-11">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16  ">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative h-[20rem] flex items-center justify-center "
              >
                <DirectionAwareHover imageUrl={service.imageUrl}>
                  <p className="font-bold text-xl">{service.title}</p>
                  {/* <p className="font-normal text-sm">{service.description}</p> */}
                </DirectionAwareHover>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
