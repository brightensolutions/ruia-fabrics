import Aboutus from "@/components/About-us";
import ContactUs from "@/components/ContactUs";
import CompanyInfo from "@/components/mission-vision";
import { ClientMarquee } from "@/components/Our-Client";
import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";

const AboutusSection = () => {
  return (
    <>
      <div>
        <ServicesSection
          image="/company/about-us-images.jpg"
          title="About Us"
          description="Ruia Fabrics is a leading name in the textile industry, specializing in high-quality Velvet, Linen, and Viscose fabrics. With a legacy built on innovation, craftsmanship, and sustainability, we proudly cater to both domestic and international markets—offering competitive, world-class textile solutions that meet the evolving demands of fashion and lifestyle industries."
          link={{ href: "/compnay/contact-us", label: "Contact Us" }}
        />
      </div>

      <div>
        <CompanyInfo/>
      </div>

      <div>
        <ContactUs/>
      </div>
    </>
  );
};

export default AboutusSection;
