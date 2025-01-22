import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { TextAnimate } from "./ui/text-animate";

const Quality = () => {
  return (
    <div
      className="bg-zinc-800 pt-11 inline-block w-[100%] py-24 bg-gradient-to-t to-white from-creamwhite relative"
      style={{
        backgroundImage: `url('/Images/Colorful Playful Fabric.jpg')`,
        backgroundPosition: "center 25%",
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t to-greencolor from-transparent"></div>
      <div className="lg:max-w-[1440px] m-auto px-[20px] relative z-20">
        <div className="flex flex-row">
          <div className="w-[50%]">
            <h2 className="text-[25px] font-rubik text-white">
            Manufacturing Excellence
            </h2>
            <h3 className="text-[45px] font-abel my-2 text-white/80">
            <TextAnimate animation="blurInUp" by="word" as="p">
            Crafting Excellence, One Product at a Time
              </TextAnimate>
             
            </h3>
            <p className="text-[18px] font-roboto text-white/80">
              We deliver world-class manufacturing solutions through innovation,
              precision, and dedication to quality.
            </p>

            <div className="grid grid-cols-2 mt-[15px] gap-[15px]">
              <div className="bg-greencolor p-5 rounded-xl">
                <h1 className="font-rubik text-[22px] font-medium text-white">
                  INNOVATIVE TECHNOLOGY
                </h1>
                <p className="mt-[2px] font-abel text-[19px] font-normal text-white">
                  Our cutting-edge technology ensures unparalleled precision in
                  every step of the manufacturing process.
                </p>
              </div>

              <div className="bg-greencolor p-5 rounded-xl">
                <h1 className="font-rubik text-[22px] font-medium text-white">
                  RELIABILITY
                </h1>
                <p className="mt-[2px] font-abel text-[19px] font-normal text-white">
                  Trusted by industries worldwide, we consistently deliver
                  products that exceed expectations.
                </p>
              </div>
            </div>

            <div className="mt-16 flex flex-row gap-[15px]">
              <Link
                href="/about"
                className="bg-zinc-900 px-5 hover:bg-black py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
              >
                Learn More{" "}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
              <Link
                href="/contact"
                className="bg-zinc-900 px-5 hover:bg-black py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
              >
                Contact Us{" "}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </div>
          </div>

          <div className="w-[50%]">
            <Image
              src="/Images/qual.webp"
              alt="About us"
              width={500}
              height={200}
              className=" object-cover m-auto -mb-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
