import Aboutus from "@/components/About-us";
import ContactUs from "@/components/ContactUs";
import CompanyInfo from "@/components/mission-vision";
import { MarqueeDemo } from "@/components/Our-Client";
import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";

const AboutusSection = () => {
  return (
    <>
      <div>
        <ServicesSection
          image="/Images/banner1.webp"
          title="About Us"
          description="Founded in 1952, Ruia Fabrics is a leader in textiles, specializing in high-quality velvet and viscose fabrics. With a legacy of innovation and sustainability, we proudly serve domestic and international markets, offering competitive, world-class products."
          link={{ href: "/contact", label: "Contact Us" }}
        />
      </div>

      <div className="bg-gradient-to-t  to-zinc-900  from-zinc-900/45">
        <Aboutus/>
      </div>

      <div>
        <CompanyInfo/>
      </div>

      <div>
        <MarqueeDemo/>
      </div>

      <div>
        <ContactUs/>
      </div>
    </>
  );
};

export default AboutusSection;
