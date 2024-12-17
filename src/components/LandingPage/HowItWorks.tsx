import Image from "next/image";

import upload from "../../../public/assets/upload.svg";
import ask from "../../../public/assets/ask.svg";
import response from "../../../public/assets/response.svg";
import validation from "../../../public/assets/validation.svg";

const HowItWorks = () => {
  const stepsList = [
    {
      imgs: upload,
      bgColor: "bg-[#0070E0]",
      description: "Upload Your Document",
    },
    {
      imgs: ask,
      bgColor: "bg-[#FFA500]",
      description: "Ask Your Questions",
    },
    {
      imgs: response,
      bgColor: "bg-[#3EB489]",
      description: "Receive AI-Powered Answers",
    },
    {
      imgs: validation,
      bgColor: "bg-[#E21885]",
      description: "Manage and Review Your Documents",
    },
  ];
  return (
    <section className="flex justify-center items-center w-full bg-[#021221]">
      <div className="flex justify-center items-center flex-col w-[90%] llg:w-[95%] py-16">
        <aside className="flex justify-center items-center mb-12">
          <h1 className="font-Ubuntu font-semibold text-white text-3xl lmd:text-2xl">
            How it works
          </h1>
          {/* <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span> */}
        </aside>
        <aside className="grid justify-center items-center md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12">
          {stepsList?.map((item, i) => (
            <main
              key={i}
              className="flex justify-center items-center flex-col rounded-lg py-4"
            >
              <div
                className={`${item.bgColor} size-[80px] rounded-full flex justify-center items-center`}
              >
                <Image
                  src={item?.imgs}
                  alt={item?.description}
                  className="size-[50%] text-2xl"
                  priority
                />
              </div>
              <h1 className="text-white font-Ubuntu font-semibold text-center mt-3">
                STEP {i + 1}
              </h1>
              <p className="text-white font-Ubuntu mt-1 font-medium text-center text-sm">
                {item?.description}
              </p>
            </main>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default HowItWorks;
