import React from "react";
import { InfiniteMovingCards } from "./ui/nfinite-moving-cards";
import Link from "next/link";

export function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative bg-gradient-to-t to-white from-creamwhite"
      
    >
      <div className="w-[80%] text-center px-[50px] relative z-10">
        <h1 className="text-[75px] font-abel text-bluecolor font-bold mb-[25px]">
          Welcome to <span className="text-greencolor font-bold font-roboto">Ruia Fabrics</span> 
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
            href="/"
            className="text-[20px] font-rubik bg-greencolor text-white py-[10px] px-[25px] rounded-[5px] hover:bg-greencolor/55 hover:text-black"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="text-[20px] font-rubik bg-greencolor text-white py-[10px] px-[25px] rounded-[5px] hover:bg-greencolor/55 hover:text-black"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="w-[100%]">
        <div className="rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="normal"
          />
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    imageUrl: "/Images/fabric1.jpg",
    altText: "Image 1",
    title: "Image 1 Title",
    description: "Description of Image 1",
  },
  {
    imageUrl: "/Images/fabric1.jpg",
    altText: "Image 2",
    title: "Image 2 Title",
    description: "Description of Image 2",
  },
  {
    imageUrl: "/Images/fabric1.jpg",
    altText: "Image 3",
    title: "Image 3 Title",
    description: "Description of Image 3",
  },
  {
    imageUrl: "/Images/fabric1.jpg",
    altText: "Image 4",
    title: "Image 4 Title",
    description: "Description of Image 4",
  },
  {
    imageUrl: "/Images/fabric1.jpg",
    altText: "Image 5",
    title: "Image 5 Title",
    description: "Description of Image 5",
  },
];
