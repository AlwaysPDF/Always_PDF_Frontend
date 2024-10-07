"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { FiUpload } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";

import people from "../../../public/assets/people.png";
import curvedArrow from "../../../public/assets/curvedArrow.svg";

const Hero = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/dashboard/my-documents");
  };

  return (
    <section className="flex justify-center items-center w-full bg-[#e2e2ff] flex-col">
      <Navbar />
      <div className="w-[90%] grid grid-cols-2 llg:grid-cols-1 gap-28 llg:gap-8 py-12">
        <aside>
          <h1 className="text-basicBlue font-Ubuntu font-light text-6xl llg:text-4xl lmd:text-3xl lg:leading-[5rem]">
            Turn your boring <b className="font-semibold">documents</b> into{" "}
            <span className="textGradient font-medium">conversations</span>
          </h1>
          <div className="flex justify-start items-center mt-8">
            {["Innovative.", "Intuitive.", "Insightful"].map((list, index) => (
              <p
                key={index}
                className="text-[#E6EBF0] border-8 border-[#C9E4FF] bg-[#1F7FDF] rounded-full px-2 first:ml-0 ml-[-12px] font-Ubuntu font-medium text-lg lsm:text-sm mb-2"
              >
                {list}
              </p>
            ))}
          </div>
          <p className="text-basicBlue font-Ubuntu font-medium text-lg mt-4">
            Ask questions, and gain insights fast.
          </p>
          <button
            onClick={handleClick}
            className="bg-basicBlue text-[#FAFAFA] px-4 py-2 rounded-md flex justify-center items-center mt-4 absolute"
          >
            <FiUpload className="mr-2" /> Upload Your PDF
          </button>
          <div>
            <Image
              src={curvedArrow}
              alt="Curved arrow"
              className="relative right-[-200px] top-[20px] lsm:w-[30%]"
              priority
            />
          </div>
        </aside>
        <aside>
          <Image src={people} alt="People in a circle" className="w-full" priority />
        </aside>
      </div>
    </section>
  );
};

export default Hero;
