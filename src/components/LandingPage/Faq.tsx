"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface OpenSectionsDetails {
  [index: number]: any;
}

const Faq = () => {
  //  usestate and function to open and close
  const [openSections, setOpenSections] = useState<OpenSectionsDetails>({});

  const handleClick = (index: number) => {
    setOpenSections({
      ...openSections,
      [index]: !openSections?.[index],
    });
  };

  const items = [
    {
      title: "What is EverPDF",
      content: "I am a developer",
    },
    {
      title: "How do I upload a document to EverPDF?",
      content: "I am a developer",
    },
    {
      title: "Can EverPDF handle multiple documents at once?",
      content: "I am a developer",
    },
    {
      title: "How secure is my data with EverPDF?",
      content: "I am a developer",
    },
    {
      title: "Are there any limitations to the free version of EverPDF?",
      content: "I am a developer",
    },
    {
      title: "How accurate are the answers provided by EverPDF?",
      content: "I am a developer",
    },
    {
      title: "What types of questions can I ask EverPDF?",
      content: "I am a developer",
    },
    {
      title: "Can EverPDF be used for professional or academic research?",
      content: "I am a developer",
    },
    {
      title: "Is customer support available for EverPDF users?",
      content: "I am a developer",
    },
    {
      title: "What makes EverPDF different from other PDF readers?",
      content: "I am a developer",
    },
  ];

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center flex-col w-[80%] llg:w-[95%]">
        <aside className="relative w-[10%] flex justify-center items-center mt-20">
          <h1 className="font-Ubuntu font-semibold text-basicBlue text-3xl">
            FAQs
          </h1>
          <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span>
        </aside>
        <div className="flex justify-center items-center w-[70%] llg:w-full bg-[#F7FBFF] mt-6 mb-20">
          <div className="grid grid-cols-1 gap-10 w-[90%] justify-between items-center flex-col py-10">
            <div className="">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="mb-6 px-4 py-4 border-b border-[#DDDDDD]"
                >
                  <div
                    //   className='d-flex gap-3 points mb-1 align-items-start'
                    className={`flex justify-start items-start ${
                      openSections[index] ? "points" : "pointss"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <h5
                      className={`text-start w-full mb-4 ${
                        openSections[index] ? "text-offblack" : "text-offblack"
                      }`}
                    >
                      <b>{item.title}</b>
                    </h5>

                    <p
                      className={`align-self-end mb-0 cursor-pointer ${
                        openSections[index] ? "" : ""
                      }`}
                    >
                      {openSections[index] ? <FaPlus /> : <FaMinus />}
                    </p>
                  </div>
                  <div
                    style={{ display: openSections[index] ? "none" : "flex" }}
                    className="gap-sm-3 contcurri"
                  >
                    <p className="mb-0">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
