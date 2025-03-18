"use client";

import React from "react";
import ServicesSection from "@/components/ServicesSectionFn";
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn";

const Product = () => {
  const greyFabric = {
    title: "Cotton Fabric",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "We are committed to producing the finest premium cotton fabrics.",
      },
      {
        paragraph:
          "We stand out for our exceptional quality, specializing in fine cotton voile, cotton dobbies, and cotton slubs, all crafted from 100% pure cotton in fine counts. Our cotton fabrics range from 55 GSM to 200 GSM, offering versatility for different applications. We also offer sustainable fabrics that are BCI and GOTS certified, internationally recognized for their high environmental and ethical standards.",
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
    title: "Viscose Fabric",
    titleColor: "text-white",
    details: [
      {
        paragraph:
          "We specialize in producing the finest premium viscose fabrics.",
      },
      {
        paragraph:
          "Known for their soft, flowy texture and elegant shine, our viscose fabrics include georgettes, chiffons, tissues, organzas, and crepes, produced with intricate dobbies. We also craft high-quality viscose fabrics using Tencel Lux and Bemberg yarn. Our viscose fabrics range from 30 GSM to 300 GSM, offering versatility for different applications from scarves to apparels . Our fabrics are certified with international sustainable standards, including ECOLEVA, ECOVERO, and FSE.",
      },
    ],
    paragraphColor: "text-white/85",
    images: {
      main: "/fabric/9.jpg",
    },
    connectUsLink: "/compnay/contact-us",
    bgcolor: "bg-custom-green",
    btncolor: "bg-custom-black"
  };

  const YarnFabric = {
    title: "Linen ",
    details: [
      {
        paragraph:
          "We offer a diverse range of linen fabrics, from pure linen to high-quality blends.",
      },
      {
        paragraph:
          "Our collection includes 100% linen as well as linen blends with cotton, viscose, lyocell, and hemp. We produce linen fabrics ranging from 70 GSM to 300 GSM, ensuring suitability is met at every step. To maintain superior quality, we use premium European flax in our fabrics. Our fabrics are crafted to meet international sustainable standards.",
      },
    ],
    paragraphColor: "text-textblak",
    images: {
      main: "/fabric/Linen.webp",
      overlay: "/images/yarn-fabric-machine.jpg",
    },
    connectUsLink: "/compnay/contact-us",
  };

  const velvetFabric2 = {
    title: "Velvet ",
    titleColor: "text-white",
    details: [
      {
        paragraph:
          "Soft, luxurious, and royal, velvet is known for its rich texture and elegant appearance.",
      },
      {
        paragraph:
          "We produce high-quality micro-velvet, viscose velvet, and nylon-viscose velvet, along with Brasso velvets ( Devoré ). Our velvet fabrics range from 150 GSM to 300 GSM, offering versatility for various applications. Our fabrics are certified with international sustainable standards.",
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

      <AnimatedDetailsAndImage {...velvetFabric2} imagePosition="right" />

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
