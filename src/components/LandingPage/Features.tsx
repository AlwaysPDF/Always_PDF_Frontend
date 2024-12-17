"use client";

import Image from "next/image";
import chatbox from "../../../public/assets/chatbox.svg";
import fet from "../../../public/assets/fet.svg";
import fet1 from "../../../public/assets/fet1.svg";
import fet2 from "../../../public/assets/fet2.svg";
import fet3 from "../../../public/assets/fet3.svg";
import fet4 from "../../../public/assets/fet4.svg";
import fet5 from "../../../public/assets/fet5.svg";
// import { AI, AIChat, Document, Inteface, MultiDocument } from "@/utils/Icon";
// import { useEffect, useState } from "react";

const Features = () => {
  // const [viewWidth, setViewWidth] = useState(0);
  const feature = [
    {
      icon: fet1,
      iconColor: "#E3FFC0",
      title: "AI-Powered Question Answering",
      desc: "Dive into your PDFs with AI-driven insights. Ask any question and get precise answers based on your document's content.",
    },
    {
      icon: fet2,
      iconColor: "#FFEAF8",
      title: "Document Upload and Management",
      desc: "Upload and manage your PDFs with ease. Secure storage and quick access to all your documents in one place.",
    },
    {
      icon: fet3,
      iconColor: "#FFFDD5",
      title: "Real-Time Interaction",
      desc: "Instantly query your PDF and receive real-time responses. Making your reading experience more interactive and efficient.",
    },
    {
      icon: fet4,
      iconColor: "#EAF4FF",
      title: "Multi-Document Analysis",
      desc: "Compare and contrast information across multiple PDFs. Get comprehensive insights without the hassle of manual cross-referencing.",
    },
    {
      icon: fet5,
      iconColor: "#F4EDFF",
      title: "User-Friendly Interface",
      desc: "Sleek, simple, and easy to navigate. Designed for an optimal user experience, whether you're a student, professional, or casual reader.",
    },
  ];

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const handleResize = () => setViewWidth(window.innerWidth);
  //     window.addEventListener("resize", handleResize);

  //     // Set the initial width
  //     handleResize();

  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // const renderFeatures = () => {
  //   if (viewWidth <= 576) {
  //     return feature.slice(0, 5);
  //   } else if (viewWidth <= 768) {
  //     // Adjust width threshold as needed
  //     return feature.slice(0, 2);
  //   } else {
  //     return feature.slice(0, 3);
  //   }
  // };
  return (
    <section className="flex justify-center items-center w-full bg-[#141f49]">
      <div className="flex justify-center items-center w-[80%] llg:w-[95%] flex-col py-16">
        <aside className="relative  w-[14%] flex justify-center items-center mb-12">
          <h1 className="font-Ubuntu font-semibold text-white text-3xl">
            Features
          </h1>
          {/* <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span> */}
        </aside>
        <aside className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            {feature.map((item, i) => (
              <div key={i} className="flex items-start relative mb-8 last:mb-0">
                {/* Left Icon Section */}
                <div className="flex flex-col items-center mr-6">
                  <div className="size-10 flex items-center justify-center rounded-full bg-[#0070E0]">
                      <Image src={item.icon} alt={item.title} />
                   </div>
                  {/* Connector Line */}
                  {i !== feature.length - 1 && (
                    <div className="w-[2px] border-l-2 border-[#3EB489] border-dashed b-[#3EB489] h-full absolute top-10 left-[1.1rem]"></div>
                  )}
                </div>

                {/* Right Text Section */}
                <div className="flex-1">
                  <h3 className="font-Ubuntu font-semibold text-white text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Image src={chatbox} alt="Chat Box" />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Features;
