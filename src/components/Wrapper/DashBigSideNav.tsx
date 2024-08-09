"use client";
import { useAppContext } from "../ContextApi/ContextApi";
import coloredLogo from "../../../public/assets/coloredLogo.png";
import { useRouter } from "next/navigation";
import DashNavLinks from "./DashNavLinks";
import Image from "next/image";
import { useState } from "react";

const DashBigSideNav = () => {
  const router = useRouter();
  const { showSidebar } = useAppContext();

  const [tier, setTier] = useState("free");
  return (
    <div className="shadow-[1px_0px_0px_0px_rgba(0,0,0,0)]">
      <div
        className={`bg-white border-r border-grey min-h-[100vh] h-[100%] lg:w-[220px] w-[220px] py-0 overflow-y-hidden fixed ml-0 md:hidden lg:flex md:px-0
          ${
            showSidebar
              ? "ml-0 z-[1000] opacity-100 show-sidebar sm:-z-[1000]"
              : "z-[-1] sm:z-[1000] ml-0"
          }
          `}
      >
        <div className=" w-full h-full flex justify-start items-center flex-col overflow-y-hidden">
          <div
            onClick={() => router.push("/")}
            className="flex justify-center items-center w-[70%] py-8"
          >
            <Image
              src={coloredLogo}
              alt="Quiztify Logo"
              className="w-[62%] h-full object-cover"
            />
            <div className="bg-[#E2FFDB] text-[#00B800] px-3 py-1 rounded-lg ml-2">
              <p>{tier}</p>
            </div>
          </div>
          <div className="w-full mt-2">
            <DashNavLinks />
          </div>
          {/* <div className="w-full flex justify-center items-center mt-[5rem] mb-[3rem]">
            <aside className="bg-white rounded-lg w-[90%] flex justify-center items-center py-4">
              <div className="w-[90%] flex justify-center items-center flex-col">
                <h1>Support 24/7</h1>
                <p>Contacts us anytime</p>
                <div className="bg-[#5872FA] w-[100px] h-[100px] rounded-full"></div>
              </div>
            </aside>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashBigSideNav;
