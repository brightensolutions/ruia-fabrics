"use client";
import React, { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
const WhyChoode = () => {
  return (
    <div className="bg-zinc-800  inline-block w-[100%] py-24  bg-gradient-to-t to-creamwhite from-white relative ">
      <div className="absolute -right-24 z-10 -top-80 opacity-30  ">
        <Image
          src="/Images/png-fabric.png"
          alt="fabric"
          width={1000}
          height={1000}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="md:max-w-[1440px] m-auto px-[20px] relative z-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[15px] items-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={90}
              gaugePrimaryColor="#007443"
              gaugeSecondaryColor="#18181B"
              name="Factory Experience"
            />

            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={98}
              gaugePrimaryColor="#007443"
              gaugeSecondaryColor="#18181B"
              name="Textile Material"
            />

            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={92}
              gaugePrimaryColor="#007443"
              gaugeSecondaryColor="#18181B"
              name="Worker Skills"
            />

            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={93}
              gaugePrimaryColor="#007443"
              gaugeSecondaryColor="#18181B"
              name="Machinery & Equipment"
            />
          </div>

          <div>
            <h2 className="font-abel text-[25px] text-greencolor font-bold mb-[15px]">
              WHY CHOOSE RUIA
            </h2>
            <p className="text-[18px] font-rubik mb-[10px] text-greencolor/80">
              Unbeatable Prices, Exceptional Quality
            </p>
            <p className="text-[18px] font-rubik mb-[10px] text-textblak">
              At RUIA, we pride ourselves on delivering premium-quality products
              at the most competitive prices. Our commitment to excellence
              ensures that every product is crafted with precision, durability,
              and attention to detail.
            </p>
            <p className="text-[18px] font-rubik mb-[10px] text-textblak">
              Our team of experts utilizes advanced technology and sustainable
              practices to create solutions that meet the highest standards.
              From raw materials to the finished product, every step undergoes
              rigorous quality control to guarantee customer satisfaction.
            </p>
            <p className="text-[18px] font-rubik mb-[10px] text-textblak">
              Join the RUIA family today and experience the perfect blend of
              innovation, quality, and affordability. We are more than just a
              brand; we are your trusted partner for excellence.
            </p>

            <div className="mt-16 flex flex-row gap-[15px]">
              <Link
                href="/about"
                className="bg-zinc-900 px-5  py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
              >
                Learn More{" "}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
              <Link
                href="/contact"
                className="bg-zinc-900 px-5  py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
              >
                Contact Us{" "}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoode;
