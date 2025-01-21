import ServicesSection from "@/components/ServicesSectionFn";
import React from "react";
import { Building2, Factory, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Market = () => {
  return (
    <div>
      <div>
        <ServicesSection
          image="/Images/banner1.webp"
          title="Market"
          description="Connect with Ruia Fabrics, a leader in textiles since 1952. Specializing in high-quality velvet and viscose fabrics, we’re here to assist you with your inquiries and provide world-class solutions. Reach out to us for any assistance or collaboration opportunities."
          link={{ href: "/contact", label: "Get in Touch" }}
        />
      </div>

      <div>
        <section className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-white text-3xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-white/80 max-w-3xl">
              VP Tex is a diverse business group based in Erode, South India,
              that specializes in spinning & weaving for arduous applications.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 ">
            <div className="text-center p-6 border rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <Building2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-[#1B2B65] text-2xl font-bold">90 Lakhs</h3>
              <div className="uppercase text-sm text-gray-600">
                <div>WOVEN FABRICS</div>
                <div>METRES / MONTH</div>
              </div>
            </div>
            <div className="text-center p-6 border rounded-lg bg-white">
              <div className="flex justify-center mb-4">
                <Factory className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-[#1B2B65] text-2xl font-bold">6 Tons</h3>
              <div className="uppercase text-sm text-gray-600">
                <div>KNITTED FABRICS</div>
                <div>TONS / DAY</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <Button
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              READ MORE
            </Button>
          </div>

          {/* Stats and Info Cards */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <Card className="bg-emerald-600 text-white p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
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
                  <div className="flex items-end gap-4 ">
                    <div>
                      <span className="text-emerald-600 text-6xl font-bold">
                        25
                      </span>
                      <span className="text-[#1B2B65] text-2xl ml-2">
                        Years
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Industries Experience</p>
                  </div>
                </CardContent>
              </Card>

              {/* Production Card */}
              <Card>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Factory className="w-6 h-6 text-emerald-600" />
                    <h4 className="text-[#1B2B65] text-xl font-bold">
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
                    <Users className="w-6 h-6 text-emerald-600" />
                    <h4 className="text-[#1B2B65] text-xl font-bold">
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
    </div>
  );
};

export default Market;
