
import React from "react";
import { MdAddCall, MdEmail, MdLocationOn } from "react-icons/md";
const ContactUs = () => {
  interface ContactCardProps {
    icon: React.ReactNode
    title: string
    content: string
  }
  const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-greencolor-light">
            {icon}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-base text-gray-500">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-t to-creamwhite pt-[45px] from-white pb-[45px]">
      <div className="lg:max-w-[1440px] p-[20px] m-auto">
        <div className="font-rubik text-[30px] font-bold text-darkgreen text-center">
          <h1>Get In Touch</h1>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={<MdAddCall className="h-8 w-8 text-greencolor" />}
            title="Phone"
            content="+91 00000 00000"
          />
          <ContactCard
            icon={<MdEmail className="h-8 w-8 text-greencolor" />}
            title="Email"
            content="info@ruiafabrics.com"
          />
          <ContactCard
            icon={<MdLocationOn className="h-8 w-8 text-greencolor" />}
            title="Address"
            content="123 Textile Street, Fabric City, 400001, India"
          />
        </div>

        <div className="bg-greencolor md:w-[70%] w-[100%] m-auto border rounded-[2px] mt-20">

          <div className="bg-gradient-to-l to-greencolor/45 from-greencolor p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 my-3 gap-[15px]">
              <input
                type="text"
                placeholder="Enter Name"
                className="w-[100%] px-2 py-3  outline-none border-b  bg-black/15"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                className="w-[100%] px-2 py-3 outline-none border-b bg-black/15"
              />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 my-3 gap-[15px]">
              <input
                type="email"
                placeholder="Enter Emial"
                className="w-[100%] px-2 py-3 outline-none border-b  bg-black/15"
              />
              <input
                type="text"
                placeholder="Enter Subject"
                className="w-[100%] px-2 py-3 outline-none border-b bg-black/15"
              />
            </div>

            <div className="my-3 ">
              <textarea
                placeholder="Enter Messsage"
                rows={10}
                cols={100}
                className="w-[100%] bg-black/15 mt-[10px] outline-none text-white p-4"
              />
            </div>

            <div className="text-center">
              <button className="bg-white px-11 py-3 text-black rounded-[2px] font-rubik">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default ContactUs;
