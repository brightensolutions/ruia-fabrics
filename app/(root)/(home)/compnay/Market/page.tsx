"use client";
import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";
import { Building2, Factory, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedDetailsAndImage from "@/components/deatilsAndImagesectionFn";
import { TextAnimate } from "@/components/ui/text-animate";

const Market = () => {
  const greyFabric2 = {
    title: "Domestic Excellence",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "With a 90% presence in the Indian market, we manufacture high-quality technical textiles that are supplied to hubs in Delhi, Jaipur, Ahmedabad, and Mumbai.",
      },
      {
        paragraph:
          "Creating bespoke solutions, we understand our clients' unique requirements and deliver customized textiles perfect for complex applications and industries.",
      },
      {
        paragraph:
          "Not only have we earned the trust of our Indian clients, but we have also reached an international clientele with our premium products.",
      },
    ],
    paragraphColor: "text-gray-700",
    images: {
      main: "/images/infra-weaving.webp",
    },
    connectUsLink: "/company/contact-us",
  };
  

  const greyFabric = {
    title: "Export Excellence",
    titleColor: "text-textblak",
    details: [
      {
        paragraph:
          "Ruia Fabrics has built a strong global presence, with a clientele spanning countries such as Egypt, Morocco, Italy, Nepal, Hong Kong, Brazil, Argentina, Sri Lanka, Germany, and across Europe. Our legacy in textiles is rooted in quality, innovation, and sustainable practices.",
      },
      {
        paragraph:
          "10% of our products are directly exported to markets like Sri Lanka, Bangladesh, Korea, and select European nations. We take pride in crafting premium-quality fabrics like velvet, viscose, georgette, crepe, and chiffon, catering to diverse industries and applications.",
      },
      {
        paragraph:
          "Ruia Fabrics traces its roots back to 1952 during the Indian textile revolution. Founded by Shri Shubhkaranji Ruia, it began as a yarn trading enterprise. Today, it has evolved into a global textile powerhouse, renowned for its quality, sustainability, and innovation.",
      },
      {
        paragraph:
          "Our portfolio includes viscose rayon velvet, synthetic velvet, and cotton velvet, ideal for a variety of applications from resort wear to evening gowns. With state-of-the-art infrastructure and expertise, we ensure unmatched quality and precision.",
      },
      {
        paragraph:
          "We are committed to sustainable practices, producing eco-friendly fabrics in collaboration with Aditya Birla Group. Our LIVA eco-vera certified fabrics highlight our dedication to a greener future.",
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
          title="Market"
          description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we’re here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
          link={{ href: "/compnay/contact-us", label: "Contact Us" }}
        />
      </div>

      <div className="bg-gradient-to-t to-creamwhite pt-[45px] from-white">
        <section className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="font-rubik text-[30px] font-bold text-darkgreen">
              
               <TextAnimate animation="blurInUp" by="character" as="p">Who We Are</TextAnimate>
              </h2>
            <p className="text-darkgreen max-w-3xl">
              VP Tex is a diverse business group based in Erode, South India,
              that specializes in spinning & weaving for arduous applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12 ">
            <div className="text-center p-6 border rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <Building2 className="w-12 h-12 text-greencolor" />
              </div>
              <h3 className="font-rubik text-[30px] font-bold text-darkgreen">90 Lakhs</h3>
              <div className="uppercase text-sm text-gray-600">
                <div>WOVEN FABRICS</div>
                <div>METRES / MONTH</div>
              </div>
            </div>
            <div className="text-center p-6 border rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <Factory className="w-12 h-12 text-greencolor" />
              </div>
              <h3 className="font-rubik text-[30px] font-bold text-darkgreen">6 Tons</h3>
              <div className="uppercase text-sm text-gray-600">
                <div>KNITTED FABRICS</div>
                <div>TONS / DAY</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <Card className="bg-darkgreen text-white p-8">
              <CardContent className="p-0">
                <h3 className="font-rubik text-[30px] font-bold text-white"> <TextAnimate animation="blurInDown" by="character" as="p">Our Mission </TextAnimate></h3>
                <div className="space-y-6">
                  <p>
                    V.P. Tex has been best known for quality for more than three
                    decades, combining expertise with a passion for excellence
                    to provide high quality material to the specification of our
                    clients. We are dedicated to meeting the needs of all of our
                    stakeholders, which include our customers, employees,
                    partners, and the general public.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="block w-4 h-0.5 bg-white mt-3 flex-shrink-0" />
                      <span>
                        To produce world class-quality fabric and yarn with the
                        highest level of competitiveness across all parameters
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="block w-4 h-0.5 bg-white mt-3 flex-shrink-0" />
                      <span>
                        To have long-standing customers by delivering
                        sustainable fabric and yarn as per the client needs.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="block w-4 h-0.5 bg-white mt-3 flex-shrink-0" />
                      <span>
                        To effectively harness and integrate all available
                        technology across various elements of the textile chain,
                        and to cater to product innovation by mastering
                        value-added fabric
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Experience Card */}
              <Card>
                <CardContent className="p-8 bg-white">
                  <div className="flex gap-2 items-center ">
                    <div className="flex items-center">
                      <span className="font-rubik text-[55px] font-bold text-darkgreen">
                        25
                      </span>
                      <span className="text-[#1B2B65] text-2xl ml-2">
                        Years
                      </span>
                    </div>
                    <p className="text-gray-600  text-[22px]">Industries Experience</p>
                  </div>
                </CardContent>
              </Card>

              {/* Production Card */}
              <Card>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Factory className="w-6 h-6 text-greencolor" />
                    <h4 className="font-rubik text-[30px] font-bold text-darkgreen">
                      Production
                    </h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>Woven Fabrics : 90 Lakh Metres / Month</li>
                    <li>Knitted Fabric : 6 Tons / day</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Team Card */}
              <Card>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="w-6 h-6 text-greencolor" />
                    <h4 className="font-rubik text-[30px] font-bold text-darkgreen">
                      Professional Team
                    </h4>
                  </div>
                  <p className="text-gray-600">
                    A versatile production & management team that is willing to
                    go beyond in its pursuit of quality and delicacy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <div>
        <AnimatedDetailsAndImage {...greyFabric2} imagePosition="left" />
      </div>

      <div>
        <AnimatedDetailsAndImage {...greyFabric} imagePosition="right" />
      </div>
    </div>
  );
};

export default Market;
