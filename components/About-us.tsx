import Image from "next/image";
import Link from "next/link";
import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-gradient-to-t to-creamwhite pt-[45px] from-white">
      <div className="lg:max-w-[1440px] px-[20px] m-auto py-[50px] ">
        <div className="flex flex-row my-[100px ] relative">
          <div className="w-[50%] flex flex-row justify-between items-end space-x-5">
            <Image
              src="/Images/about-us1.jpg"
              alt="About Us"
              className=" w-[80%] m-auto   border-[2px] rounded-[5px] rounded-b-none border-white  "
              width={200}
              height={200}
            />
            <div className="left-1/1 top-1/2 absolute">
              <Image
                src="/Images/about-us1.jpg"
                alt="About Us"
                className="w-full m-auto border-[2px] rounded-[5px] rounded-b-none border-white  "
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="w-[50%] bg-greycolor p-5 rounded-[5px]  ">
            <div className="p-5 border-[#fc916b] border-[1px] ">
              <h2 className="font-rubik text-[30px] font-bold text-white mb-5">
                About Us
              </h2>
              <p className="text-white/80 font-abel text-[20px] leading-[1.8]">
                Ruia Fabrics is a family-owned organization established in 1952
                by the late Shri Shubhkaranji Ruia, who began as a yarn merchant
                trading across India. Over decades, the company evolved,
                expanding into fabric trading and manufacturing. In 1990,
                Madhusudan Ruia founded Ruia Fabrics Private Limited, focusing
                on quality and innovation in fabrics.
              </p>
              <p className="text-white/80 font-abel text-[20px] leading-[1.8] mb-[10px]">
                Today, Ruia Fabrics specializes in sustainable practices,
                weaving eco-friendly viscose fabrics in collaboration with the
                Aditya Birla Group. The company produces over 200,000 meters of
                LIVA eco-vera fabrics monthly, adhering to its commitment to
                sustainability and quality.
              </p>
              <p className="text-white/80 font-abel text-[20px] leading-[1.8] mb-[10px]">
                In 2018, Ruia Fabrics expanded further with Klassiq Silk Mills
                in Surat, importing advanced velvet manufacturing machines to
                produce luxurious micro velvet fabrics. With a monthly capacity
                of one lakh meters, Klassiq Silk Mills has established a robust
                distribution network across India and the Middle East, meeting
                the highest standards of quality and design.
              </p>
              <p className="text-white/80 font-abel text-[20px] leading-[1.8] mb-[10px]">
                Guided by a futuristic vision, Ruia Fabrics has become a
                world-class manufacturer, providing voile, chiffon, crepes, and
                georgette fabrics for both domestic and international markets.
                Sustainability and ethical practices remain at the heart of its
                operations, ensuring a better future for people and the planet.
              </p>

              <div>
                <Link
                  href="/"
                  className="font-rubik bg-white/35 py-2 inline-block px-7 rounded-[5px] border border-white/15"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
