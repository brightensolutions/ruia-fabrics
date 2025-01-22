import ContactUs from "@/components/ContactUs";
import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <ServicesSection
          image="/Images/banner1.webp"
          title="Contact Us"
          description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we’re here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
          link={{ href: "/contact", label: "Get in Touch" }}
        />
      </div>

      <div className="">
        <ContactUs />
      </div>
    </div>
  );
};

export default page;
