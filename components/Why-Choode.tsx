"use client";
import React, { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";
import { motion, useAnimation, useInView } from "framer-motion";

const WhyChoode = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-zinc-800 inline-block w-[100%] py-24 bg-gradient-to-t to-creamwhite from-white relative"
    >
      <div className="md:max-w-[1440px] m-auto px-[20px] relative z-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[15px] items-center">
          <div className="grid md:grid-cols-2 grid-cols-2 gap-4">
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

          <div className="md:mt-0 mt-20">
            <h2 className="font-abel text-[25px] text-greencolor font-bold mb-[15px]">
              <TextAnimate animation="blurInUp" by="word" as="p">
                WHY CHOOSE RUIA
              </TextAnimate>
            </h2>
            <p className="text-[18px] font-rubik mb-[10px] text-greencolor/80">
              <TextAnimate animation="blurInUp" by="line" as="p">
                Unbeatable Prices, Exceptional Quality
              </TextAnimate>
            </p>
            <motion.p
              variants={itemVariants}
              className="text-[18px] font-rubik mb-[10px] text-textblak"
            >
              At RUIA, we pride ourselves on delivering premium-quality products
              at the most competitive prices. Our commitment to excellence
              ensures that every product is crafted with precision, durability,
              and attention to detail.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[18px] font-rubik mb-[10px] text-textblak"
            >
              Our team of experts utilizes advanced technology and sustainable
              practices to create solutions that meet the highest standards.
              From raw materials to the finished product, every step undergoes
              rigorous quality control to guarantee customer satisfaction.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-[18px] font-rubik mb-[10px] text-textblak"
            >
              Join the RUIA family today and experience the perfect blend of
              innovation, quality, and affordability. We are more than just a
              brand; we are your trusted partner for excellence.
            </motion.p>

            <div className="mt-16 flex flex-row gap-[15px]">
              <Link
                href="/about"
                className="bg-zinc-900 px-5 py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
              >
                Learn More{" "}
                <span>
                  <FaAngleRight />
                </span>
              </Link>
              <Link
                href="/contact"
                className="bg-zinc-900 px-5 py-4 flex flex-row items-center gap-[5px] font-rubik w-fit rounded-[5px]"
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
    </motion.div>
  );
};

export default WhyChoode;
