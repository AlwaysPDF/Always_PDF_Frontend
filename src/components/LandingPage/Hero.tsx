"use client";

import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import { FiUpload } from "react-icons/fi";
import people from "../../../public/assets/people.png"
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-document");
  };

  const lists =["Innovative.", "Intuitive.", "Insi"]
  return (
    <section className="flex justify-center items-center w-full bg-[#e2e2ff] flex-col">
      <Navbar />
      <div className="w-[90%] grid grid-cols-2 gap-28 py-12">
        <aside>
          <h1 className="text-basicBlue font-Ubuntu font-light text-6xl">
            Turn your boring <b>documents</b> into{" "}
            <span className="textGradient font-medium">conversations</span>
          </h1>
          <p className="text-basicBlue font-Ubuntu font-medium text-lg mt-4">
            Ask questions, and gain insights fast.
          </p>
          <button
            onClick={handleClick}
            className="bg-basicBlue text-[#FAFAFA] px-4 py-2 rounded-md flex justify-center items-center mt-4"
          >
            <FiUpload className="mr-2" /> Upload Your PDF
          </button>
        </aside>
        <aside>
          <Image src={people} alt="People in a circle" className="w-full" />
        </aside>
      </div>
    </section>
  );
};

export default Hero;
