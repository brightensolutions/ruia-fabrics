"use client";
import React from "react";
import ServicesSection from "@/components/ServicesSectionFn";
import Image from "next/image";
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn";

const Infrastructure = () => {
  const greyFabric = {
    title: "Weaving Preparatory",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "To convert spun yarns into high-quality warp beams, our sizing machines are distinguished by their ease of operation and precise process control. The sized warp beams ensure maximum weaving efficiency. For sizing, we have 2 Karl Mayer Machines and also supply high-quality sized beams based on customers' weaving loom needs.",
      },
    ],
    paragraphColor: "text-gray-700",
    images: {
      main: "/images/weaving-preparatory (1).webp",
    },
    connectUsLink: "/company/contact-us",
  };

  const greyFabric2 = {
    title: "Weaving",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "Our in-house weaving unit is equipped with 254 Airjet looms that can produce high-quality woven fabrics.",
      },
      {
        paragraph:
          "We can produce woven strands that can be twisted into various patterns through our Weaving Division.",
      },
      {
        paragraph:
          "Following yarn selection, the amount of warp required for the fabric is calculated, and our expert technicians monitor the warping process for any flaws, mending imperfections.",
      },
    ],
    paragraphColor: "text-gray-700",
    images: {
      main: "/images/infra-weaving.webp",
    },
    connectUsLink: "/company/contact-us",
  };

  return (
    <div>
      <div>
        <ServicesSection
          image="/images/banner1.webp"
          title="Infrastructure"
          description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we’re here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
          link={{ href: "/contact", label: "Get in Touch" }}
        />
      </div>

      <div className="bg-gradient-to-t to-creamwhite pt-[45px] from-white">
        <Image
          src="/images/services-detail-img.jpg"
          alt="fabric"
          width={800}
          height={800}
          className="object-cover md:min-h-full md:min-w-[80%] min-w-[90%] min-h-[350px] m-auto w-[50%] rounded-t-[5px]"
        />
      </div>

      <div className="lg:max-w-[1440px] m-auto px-[20px]">
        <section className="mt-10">
          <h4 className="font-rubik text-[30px] font-bold text-darkgreen">
            Infrastructure
          </h4>
          <h2 className="ont-abel text-[40px] font-normal text-greycolor">Spinning</h2>
          <p className="text-[25px] font-abel text-textblak">
            We stand committed to the business values and ethics in every
            product we turn out!
          </p>
          <p className="text-[25px] font-abel text-textblak">
            Our spinning division produces 160 tons of yarn daily through
            1,30,000 spindles, providing a diverse range of yarns.
          </p>
        </section>
      </div>

      <div>
        <AnimatedDetailsAndImage {...greyFabric} imagePosition="left" />
      </div>

      <section className="bg-creamwhite py-10">
        <div className="lg:max-w-[1440px] m-auto px-[20px]">
          <h2 className="font-rubik text-[30px] font-bold text-darkgreen">
            About Ruia Fabrics
          </h2>
          <p className="text-[18px] font-rubik text-gray-700 leading-7">
            Ruia Fabrics, established during the textile revolution of 1952, is
            a family-owned enterprise known for its high-quality velvet and
            viscose fabrics. It has evolved under the guidance of Shri
            Shubhkaranji Ruia and his entrepreneurial family.
          </p>
          <ul className="list-disc list-inside text-[18px] font-rubik text-gray-700 mt-4">
            <li>Certified by Grasim Industries (Aditya Birla Group).</li>
            <li>Produces 200,000 meters/month of LIVA eco-vera fabrics.</li>
            <li>Known for sustainable practices since 2018.</li>
          </ul>
        </div>
      </section>

      <div>
        <AnimatedDetailsAndImage {...greyFabric2} imagePosition="right" />
      </div>

      <section className="bg-white py-10">
        <div className="lg:max-w-[1440px] m-auto px-[20px]">
          <h2 className="font-rubik text-[30px] font-bold text-darkgreen">
            The Klassiq Silk Mills
          </h2>
          <p className="text-[18px] font-rubik text-gray-700 leading-7">
            Based in Surat, Gujarat, The Klassiq Silk Mills specializes in
            velvet and viscose fabrics, with a monthly production capacity of
            three lakh meters. Our state-of-the-art infrastructure ensures
            top-quality products for both fashion and interior industries.
          </p>
          <ul className="list-disc list-inside text-[18px] font-rubik text-gray-700 mt-4">
            <li>Viscose/Rayon Velvet</li>
            <li>Synthetic Velvet</li>
            <li>Cotton Velvet</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Infrastructure;
