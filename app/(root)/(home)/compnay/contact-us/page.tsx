import ContactUs from "@/components/ContactUs";
import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <ServicesSection
          image="/images/banner1.webp"
          title="Contact Us"
          description="At Ruia Fabrics, we craft premium quality fabrics for discerning clients. For personalized assistance or collaboration inquiries, we welcome you to get in touch."
          link={{ href: "https://wa.me/917021418483", label: "Get in Touch" }}
        />
      </div>

      <div className="">
        <ContactUs />
      </div>
    </div>
  );
};

export default page;
