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
      title: "What is AlwaysPDF",
      content: "AlwaysPDF is an AI-powered web app that allows you to interact with your PDF documents using natural language. By leveraging advanced AI technology, AlwaysPDF enables users to ask questions about the content of their PDFs and receive instant, context-aware answers, making document reading, research, and analysis faster and more intuitive.",
    },
    {
      title: "How do I upload a document to AlwaysPDF?",
      content: 'Uploading a document is simple and quick. After logging into your AlwaysPDF account, click on the "Upload Document" button, select the PDF file from your device, and confirm. Your document will then be securely uploaded, ready for you to interact with instantly.',
    },
    {
      title: "Can AlwaysPDF handle multiple documents at once?",
      content: "Yes! With the Premium and Enterprise plans, AlwaysPDF supports multi-document analysis, allowing you to upload and analyze multiple PDFs simultaneously. You can ask questions that span across these documents, and AlwaysPDF will provide intelligent, consolidated answers.",
    },
    {
      title: "How secure is my data with AlwaysPDF?",
      content: "At AlwaysPDF, security and privacy are top priorities. Your uploaded documents are encrypted and stored securely. We do not share your data with third parties, and all interactions are processed with advanced encryption protocols to ensure your information remains confidential.",
    },  
    {
      title: "How accurate are the answers provided by AlwaysPDF?",
      content: "AlwaysPDF provides highly accurate and context-aware responses powered by ChatGPT’s advanced natural language processing. While accuracy depends on the clarity and structure of your PDF, the tool is optimized to understand even complex documents and deliver precise answers.",
    },
    {
      title: "What types of questions can I ask AlwaysPDF?",
      content: "You can ask any question related to your document's content. Whether you’re looking for a specific detail, a section summary, key highlights, or explanations of concepts, AlwaysPDF understands your queries and retrieves relevant, accurate answers efficiently.",
    },
    {
      title: "Can AlwaysPDF be used for professional or academic research?",
      content: "Absolutely! AlwaysPDF is an excellent tool for professionals, students, and researchers. It simplifies document analysis, accelerates research, and makes working with complex PDFs much more efficient, saving hours of manual reading and searching.",
    },
    {
      title: "Is customer support available for AlwaysPDF users?",
      content: "Yes, customer support is available to all users. Free plan users can access the community forum and FAQs, while Premium and Enterprise users enjoy priority email support and direct assistance to resolve issues or answer questions quickly.",
    },
    {
      title: "What makes AlwaysPDF different from other PDF readers?",
      content: "Unlike traditional PDF readers, AlwaysPDF transforms PDFs into interactive experiences using AI-powered question-and-answer technology. Instead of manually searching for information, you can ask questions and get instant answers, saving time and making document analysis smarter and more efficient.",
    },
  ];

  return (
    <section className="flex justify-center items-center w-full bg-[#021221]">
      <div className="flex justify-center items-center flex-col w-[80%] llg:w-[95%]">
        <aside className="relative w-[10%] flex justify-center items-center mt-20">
          <h1 className="font-Ubuntu font-semibold text-white text-3xl">
            FAQs
          </h1>
          {/* <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span> */}
        </aside>
        <div className="flex justify-center items-center w-[70%] llg:w-full  mt-6 mb-20">
          <div className="grid grid-cols-1 gap-10 w-[90%] justify-between items-center flex-col py-10">
            <div className="">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 px-4 py-4 bg-[#141F49] rounded-md"
                >
                  <div
                    //   className='d-flex gap-3 points mb-1 align-items-start'
                    className={`flex justify-start items-start ${
                      openSections[index] ? "points" : "pointss"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <h5
                      className={`text-start w-full ${
                        openSections[index] ? "text-white" : "text-white"
                      }`}
                    >
                      <b>{item.title}</b>
                    </h5>

                    <p
                      className={`align-self-end mb-0 cursor-pointer ${
                        openSections[index] ? "" : ""
                      }`}
                    >
                      {openSections[index] ? <FaPlus className="text-white" /> : <FaMinus className="text-white" />}
                    </p>
                  </div>
                  <div
                    className={`gap-sm-3 contcurri ${openSections[index] ? "hidden" : "flex mt-4"}`}
                  >
                    <p className="mb-0 text-white text-sm">{item.content}</p>
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
