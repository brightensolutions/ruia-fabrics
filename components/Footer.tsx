import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FloatingDockDemo } from "./socialMediaIcon";
import PulsingWhatsApp from "./PulsingWhatsApp";

const Footer: React.FC = () => {
  const footerData = [
    {
      title: "Company",
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "company/aboutus" },
        { name: "Service", url: "company/services" },
        { name: "Product", url: "company/product" },
        { name: "Contact", url: "company/contact" },
      ],
    },
    {
      title: "contact",
      links: [
        { name: "+91 00000 00000", url: "#" },
        { name: "info@ruiafabrics.com", url: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-darkgreen dark:bg-gray-900 border-t-[2px] border-darkgreen pt-[20px] pb-[10px] sm:pt-[30px] sm:pb-[20px]">
      <div className="mx-auto w-full md:max-w-[1440px] px-[20px] py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/ruia fab.png"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2">
            {footerData.map((section, index) => (
              <div key={index}>
                <h2 className="font-rubik text-[20px] mb-2 font-bold text-white">
                  {section.title}
                </h2>
                <ul className="text-greencolor/89 font-abel text-[20px] dark:text-gray-400 font-medium">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-4">
                      <Link href={link.url} className="">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
      
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2025{" "}
          <Link
            href="https://brightensolutions.com/"
            className="hover:underline"
          >
            brightensolutions™
          </Link>
          . All Rights Reserved.
         
        </span>
        <span className="hidden md:flex ">
          <FloatingDockDemo />
        </span>

      </div>
      </div>

      <div className="fixed z-[999] bottom-4 right-4">
        <PulsingWhatsApp />
      </div>
    </footer>
  );
};

export default Footer;
