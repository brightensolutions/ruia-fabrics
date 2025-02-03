import React from "react";
import { InfiniteMovingCards } from "./ui/nfinite-moving-cards";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" relative bg-gradient-to-t to-white from-creamwhite">
      <div className="md:w-[80%] w-[100%]  md:text-center text-right relative z-10 min-h-screen  lg:max-w-[1440px] m-auto px-[20px] md:pt-40 pt-24 ">
        <h1 className="md:text-[75px] text-[45px] font-abel text-bluecolor font-bold mb-[25px] ">
          <span className="text-greencolor font-bold font-roboto">
            <TextAnimate animation="slideLeft" by="word">
              Welcome to Ruia Fabrics
            </TextAnimate>
          </span>
        </h1>
        <p className="text-[25px] mb-6 text-textblak font-abel">
          Established in 1990, Ruia Fabrics has been a leading name in the
          textile industry, offering premium fabrics like voile, chiffon, crepe,
          georgette, and velvet. With a strong commitment to quality and
          sustainability, we produce world-class fabrics, catering to both
          domestic and international markets.
        </p>
        <p className="text-[25px] mb-6 text-textblak  font-abel">
          Our vision is to combine traditional craftsmanship with modern
          innovation, ensuring that every fabric we create is of the highest
          quality. Join us in our journey towards a sustainable future.
        </p>

        <div className="flex justify-center  space-x-6 mb-[40px]">
          <Link
            href="/compnay/about-us"
            className="text-[20px] font-rubik bg-greencolor text-white py-[10px] px-[25px] rounded-[5px] hover:bg-greencolor/55 hover:text-black"
          >
            About Us
          </Link>
          <Link
            href="/compnay/contact-us"
            className="text-[20px] font-rubik bg-greencolor text-white py-[10px] px-[25px] rounded-[5px] hover:bg-greencolor/55 hover:text-black"
          >
            Contact Us
          </Link>
        </div>
        <div className="w-[100%] mt-20">
          <div className="rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    imageUrl: "/images/velvet fabrics.jpg",
    altText: "Image 1",
    title: "Image 1 Title",
    description: "Description of Image 1",
  },
  {
    imageUrl: "/images/velvet fabrics (1).jpg",
    altText: "Image 2",
    title: "Image 2 Title",
    description: "Description of Image 2",
  },
  {
    imageUrl: "/images/velvet fabrics.jpg",
    altText: "Image 3",
    title: "Image 3 Title",
    description: "Description of Image 3",
  },
  {
    imageUrl: "/images/velvet fabrics (1).jpg",
    altText: "Image 4",
    title: "Image 4 Title",
    description: "Description of Image 4",
  },
  {
    imageUrl: "/images/velvet fabrics.jpg",
    altText: "Image 5",
    title: "Image 5 Title",
    description: "Description of Image 5",
  },
];
