import Image from "next/image";

import step1 from "../../../public/assets/step1.svg";
import step2 from "../../../public/assets/step2.svg";
import step3 from "../../../public/assets/step3.svg";
import step4 from "../../../public/assets/step4.svg";

const HowItWorks = () => {
  const stepsList = [
    {
      imgs: step1,
      description: "Upload Your Document",
    },
    {
      imgs: step2,
      description: "Ask Your Questions",
    },
    {
      imgs: step3,
      description: "Receive AI-Powered Answers",
    },
    {
      imgs: step4,
      description: "Manage and Review Your Documents",
    },
  ];
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center flex-col w-[70%] llg:w-[95%] py-16">
        <aside className="relative  w-[23%] lmd:w-[60%] lsm:w-full flex justify-center items-center mb-12">
          <h1 className="font-Ubuntu font-semibold text-basicBlue text-3xl lmd:text-2xl">
            How it works
          </h1>
          <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span>
        </aside>
        <aside className="grid lg:grid-cols-2 gap-16">
          {stepsList?.map((item, i) => (
            <main
              key={i}
              className="flex justify-center items-center bg-white stepListShadow border border-[#e6e6e6] rounded-lg py-4"
            >
              <div className="w-[90%]">
                <Image
                  src={item?.imgs}
                  alt={item?.description}
                  className="mb-8"
                  priority
                />
                <h1 className="text-basicBlue font-Ubuntu font-semibold">
                  STEP {i + 1}
                </h1>
                <p className="text-offblack font-Ubuntu mt-1 font-medium">
                  {item?.description}
                </p>
              </div>
            </main>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default HowItWorks;
