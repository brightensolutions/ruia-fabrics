"use client";

import React from "react";
import ServicesSection from "@/components/ServicesSectionFn";
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn";

const Product = () => {
  const greyFabric = {
    title: "Grey Fabric",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "We take pride in producing the best in the form of Rayon Grey Fabric.",
      },
      {
        paragraph:
          "We are unrivaled in terms of quality because it is made with quality-assured yarn.",
      },
      {
        paragraph:
          "Because of the high-quality standards, the market value of this finely crafted fabric material is high. The use of technologically advanced processing machines improves the appearance and overall appeal of the fabric. We produce some of the best Cotton Grey Fabric & Rayon Grey Fabric which are the in-demand fabric in the market.",
      },
    ],
    paragraphColor: "text-gray-700",
    images: {
      main: "/images/grey.webp",
      overlay: "/images/greyfabric2.jpg",
    },
    connectUsLink: "/compnay/contact-us",
    sectioncolor: "bg-gradient-to-t to-creamwhite from-white",
  };

  const velvetFabric = {
    title: "Velvet  Fabric",
    titleColor: "text-white",
    details: [
      {
        paragraph:
          "Ruia Fabrics, a family-owned business since 1952, has evolved from a yarn merchant into a major textile producer, focusing on high-quality velvet fabrics.",
      },
      {
        paragraph:
          "In 2018, the company established The Klassiq Silk Mills in Surat, specializing in velvet fabrics such as Viscose/Rayon Velvet, Synthetic Velvet, and Cotton Velvet, known for their luxurious feel and durability.",
      },
      {
        paragraph:
          "Klassiq Silk Mills also produces sustainable viscose fabrics in collaboration with Aditya Birla Group, contributing to eco-friendly textile manufacturing.",
      },
      {
        paragraph:
          "In addition to velvet, the mills produce resort wear fabrics like chiffon, crepe, georgette, and satin voile, offering unique textures and finishes for elegant clothing.",
      },
      {
        paragraph:
          "With a monthly production capacity of over 300,000 meters, Ruia Fabrics and Klassiq Silk Mills have a strong presence in the textile industry, both domestically and internationally.",
      },
    ],
    paragraphColor: "text-white/85",
    images: {
      main: "/images/valvet-fabric.jpg",
    },
    connectUsLink: "/compnay/contact-us",
    bgcolor: "bg-custom-green",
    btncolor: "bg-custom-black"
  };

  const YarnFabric = {
    title: "Yarn  Fabric",
    details: [
      {
        paragraph:
          "Good quality fabric can be possible only if the best of yarn used to make the fabric.",
      },
      {
        paragraph:
          "Our company is dedicated to meeting the high demands and expectations of customers who require both quality and quantity at a reasonable price.",
      },
      {
        paragraph:
          "We bring them the highest quality materials, such as 100% Viscose, 100% Micro Modal, Cotton Linen/Cotton Flax, Rayon Linen/Rayon Flax, Modal Linen, and many others, which have numerous applications in the textile industry.",
      },
    ],
    paragraphColor: "text-textblak",
    images: {
      main: "/images/Yarn-fabric.jpg",
      overlay: "/images/yarn-fabric-machine.jpg",
    },
    connectUsLink: "/compnay/contact-us",
  };

  return (
    <div>
      <ServicesSection
        image="/images/banner1.webp"
        title="Our Products"
        description="Established in 1952, Ruia Fabrics has evolved into a global leader in high-quality velvet and viscose fabrics. With a strong history of innovation and excellence, we produce a wide range of fabrics, including viscose/rayon velvet, synthetic velvet and cotton velvet, that cater to a variety of applications."
        link={{ href: "/compnay/contact-us", label: "Contact Us" }}
      />

      <div className="bg-gradient-to-t to-creamwhite pt-[45px] from-white">
        <AnimatedDetailsAndImage {...greyFabric} imagePosition="left" />
      </div>

      <AnimatedDetailsAndImage {...velvetFabric} imagePosition="right" />

      <AnimatedDetailsAndImage {...YarnFabric} imagePosition="left" />

      <div
      className="relative bg-cover bg-center flex flex-col items-end justify-end h-[50vh] sm:h-[60vh] md:h-[70vh]"
      style={{
        backgroundImage: `url('/images/banner1.webp')`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-custom-green/80 to-custom-black/60"></div>
      <div className="bg-custom-cream text-custom-black relative z-10 w-full md:w-[70%] lg:w-[60%] xl:w-[50%] p-6 md:p-8 lg:p-11 md:mr-6 lg:mr-11">
        <h2 className="font-rubik text-3xl md:text-4xl font-bold text-custom-green">Products</h2>
        <h4 className="font-abel text-3xl md:text-4xl lg:text-5xl font-normal text-custom-black mt-2">
          Processed Fabric
        </h4>
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl font-roboto text-custom-black/80">
          We manufacture an array of Plain Dyed Fabrics in a wide range of colors and patterns to keep up with changing
          fashion trends, designer demands, and market demands.
        </p>
        <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl font-roboto text-custom-black/80">
          Our main line of Plain Dyed and printed Fabrics and materials reflects vibrancy as well as opulence, which
          stems from our desire to create something unique that is unparalleled and unmatched anywhere in the world. Our
          processed fabrics are made with high-quality machines to improve quality and minimize defects and flaws
          without compromising on quality.
        </p>
        <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl font-roboto text-custom-black/80">
          Our experienced professionals quality test the Printed Fabrics against a variety of parameters based on the
          client&apos;s needs and preferences.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Product;
