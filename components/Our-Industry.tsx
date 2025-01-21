import React from "react";

type IndustryStat = {
  number: string;
  label: string;
};

const OurIndustry: React.FC = () => {
  const industryData: IndustryStat[] = [
    { number: "200+", label: "Our Fabric" },
    { number: "7+", label: "Export Country" },
    { number: "7500+", label: "Satisfied Customer" },
  ];

  return (
    <div className="bg-creamwhite">
    <div className="md:max-w-[1440px] m-auto px-[20px] py-14 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        <div className="w-[30%]">
          <h1 className="text-[45px] font-bold text-textblak font-rubik">Our Industry In Numbers</h1>
        </div>

        <div className="flex flex-wrap justify-end  gap-14 w-[70%]">
          {industryData.map((item, index) => (
            <div key={index} className="text-center">
              <h2 className="text-[55px] font-abel text-textblak  font-extrabold">{item.number}</h2>
              <p className="text-lg  font-rubik text-textblak ">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default OurIndustry;
