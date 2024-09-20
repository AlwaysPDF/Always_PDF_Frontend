import React, { ReactNode } from "react";

import DashBigSideNav from "../components/Wrapper/DashBigSideNav";
import DashMainNav from "@/components/Wrapper/DashMainNav";
// import { useAppContext } from "../components/ContextApi/ContextApi";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <div className="image-wrapper ">
        <section>
          {/* <DashMainNav /> */}
          <main className=" grid grid-cols-1 bg-[#fafafa] lg:grid-cols-[auto_] w-full">
            {/* <DashSmallSideNav /> */}
            <DashBigSideNav />
            <div className="w-full flex justify-center items-center">
              <div
                className={`dashboard-page  w-[95vw] mx-auto my-[10vh]  lg:w-[95%] llg:w-full`}
              >
                  <DashMainNav />
                {children}
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default Wrapper;
