"use client";

import { AI, AIChat, Document, Inteface, MultiDocument } from "@/utils/Icon";
import { useEffect, useState } from "react";

const Features = () => {
  const [viewWidth, setViewWidth] = useState(0);
  const feature = [
    {
      icon: AI,
      iconColor: "#E3FFC0",
      title: "AI-Powered Question Answering",
      desc: "Dive into your PDFs with AI-driven insights. Ask any question and get precise answers based on your document's content.",
    },
    {
      icon: Document,
      iconColor: "#FFEAF8",
      title: "Document Upload and Management",
      desc: "Upload and manage your PDFs with ease. Secure storage and quick access to all your documents in one place.",
    },
    {
      icon: AIChat,
      iconColor: "#FFFDD5",
      title: "Real-Time Interaction",
      desc: "Instantly query your PDF and receive real-time responses. Making your reading experience more interactive and efficient.",
    },
    {
      icon: MultiDocument,
      iconColor: "#EAF4FF",
      title: "Multi-Document Analysis",
      desc: "Compare and contrast information across multiple PDFs. Get comprehensive insights without the hassle of manual cross-referencing.",
    },
    {
      icon: Inteface,
      iconColor: "#F4EDFF",
      title: "User-Friendly Interface",
      desc: "Sleek, simple, and easy to navigate. Designed for an optimal user experience, whether you're a student, professional, or casual reader.",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setViewWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Set the initial width
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const renderFeatures = () => {
    if (viewWidth <= 576) {
      return feature.slice(0, 5);
    } else if (viewWidth <= 768) {
      // Adjust width threshold as needed
      return feature.slice(0, 2);
    } else {
      return feature.slice(0, 3);
    }
  };
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-[80%] llg:w-[95%] flex-col py-16">
        <aside className="relative  w-[14%] flex justify-center items-center mb-12">
          <h1 className="font-Ubuntu font-semibold text-basicBlue text-3xl">
            Features
          </h1>
          <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span>
        </aside>
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 llg:gap-y-6">
          {viewWidth >= 576 ? (
            <div className="col-span-3 flex gap-6 lsm:hidden">
              {renderFeatures()?.map((item, i) => (
                <div
                  key={i}
                  className="bg-white featureBox px-6 py-8 rounded-lg lmd:flex-1"
                >
                  <span
                    style={{ backgroundColor: item?.iconColor }}
                    className={`bg-[${item?.iconColor}] h-[50px] w-[50px] flex justify-center items-center p-3 rounded-full mb-3`}
                  >
                    {item?.icon &&
                      (typeof item.icon === "function"
                        ? item.icon()
                        : item.icon)}
                  </span>
                  <h1 className="text-[#2E2E27] font-Ubuntu text-[16px] font-semibold mb-4">
                    {item?.title}
                  </h1>
                  <p className="text-sm text-[#2E2E27] font-normal font-Ubuntu">
                    {item?.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            renderFeatures()?.map((item, i) => (
              <div
                key={i}
                className="bg-white featureBox px-6 py-8 rounded-lg lmd:flex-1"
              >
                <span
                  style={{ backgroundColor: item?.iconColor }}
                  className={`bg-[${item?.iconColor}] h-[40px] w-[40px] flex justify-center items-center p-3 rounded-full mb-3`}
                >
                  {item?.icon &&
                    (typeof item.icon === "function" ? item.icon() : item.icon)}
                </span>
                <h1 className="text-[#2E2E27] font-Ubuntu text-[16px] font-semibold mb-4">
                  {item?.title}
                </h1>
                <p className="text-sm text-[#2E2E27] font-normal font-Ubuntu">
                  {item?.desc}
                </p>
              </div>
            ))
          )}
          <aside className="col-span-3 lg:hidden lsm:hidden flex-1 bg-white featureBox px-6 py-8 rounded-lg">
            {feature.slice(2, 3).map((item, i) => (
              <div key={i} className="">
                <span
                  style={{ backgroundColor: item?.iconColor }}
                  className={`bg-[${item?.iconColor}] h-[50px] w-[50px] flex justify-center items-center p-3 rounded-full mb-3`}
                >
                  {item?.icon &&
                    (typeof item.icon === "function" ? item.icon() : item.icon)}
                </span>
                <h1 className="text-[#2E2E27] font-Ubuntu text-[16px] font-semibold mb-4">
                  {item?.title}
                </h1>
                <p className="text-sm text-[#2E2E27] font-normal font-Ubuntu">
                  {item?.desc}
                </p>
              </div>
            ))}
          </aside>
          <aside className="col-span-3 flex gap-6 lsm:hidden">
            {feature.slice(3).map((item, i) => (
              <div
                key={i}
                className="flex-1 bg-white featureBox px-6 py-8 rounded-lg"
              >
                <span
                  style={{ backgroundColor: item.iconColor }}
                  className={`h-[50px] w-[50px] flex justify-center items-center p-3 rounded-full mb-3`}
                >
                  {item?.icon &&
                    (typeof item.icon === "function" ? item.icon() : item.icon)}
                </span>
                <h1 className="text-[#2E2E27] font-Ubuntu text-[16px] font-semibold mb-4">
                  {item?.title}
                </h1>
                <p className="text-sm text-[#2E2E27] font-normal font-Ubuntu">
                  {item?.desc}
                </p>
              </div>
            ))}
          </aside>
        </aside>
      </div>
    </section>
  );
};

export default Features;
