"use client";
import { FiUpload } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useAppContext } from "../ContextApi/ContextApi";
import { useEffect, useState } from "react";
import Image from "next/image";

const DashMainNav = () => {
  const { setIsModalOpen } = useAppContext();

  const [isOnline, setIsOnline] = useState(false);
  const [lastOnlineStatus, setLastOnlineStatus] = useState(false);

  const updateOnlineStatus = () => {
    if (typeof navigator !== "undefined") {
      setLastOnlineStatus(navigator.onLine);
      if (navigator.onLine) {
        checkInternetConnection();
      } else {
        setIsOnline(false);
      }
    }
  };

  const checkInternetConnection = () => {
    fetch("https://www.google.com", { method: "HEAD", mode: "no-cors" })
      .then(() => {
        setIsOnline(true);
      })
      .catch(() => {
        setIsOnline(false);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      const interval = setInterval(checkInternetConnection, 1000); // Check every 5 seconds

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.onLine && !isOnline) {
      checkInternetConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastOnlineStatus, isOnline]);

  return (
    <nav className=" w-full fixed top-0 h-[15vh]">
      <div className="lg:pl-[220px] flex justify-center items-center  w-full h-full lg:w-[95%] z-[500] bg-white">
        <div className="w-[95vw] h-full flex justify-center items-center border-b border-borderGrey py-4">
          <main className="flex justify-between items-center py- w-full">
            <aside className="flex justify-start items-center flex-col">
              <div>
                <Image src="" alt="" />
              </div>
              <div className="">
                <h1 className="text-closedark font-Ubuntu font-medium text-lg mb-0 pb-0">
                  EverPDF
                </h1>
                <p
                  className={`${isOnline ? "text-[#00B800]" : "text-[red]"} text-[10px] font-Ubuntu`}
                >
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
              {/* <h3 className="text-grey font-Helvetica mt-0 pt-0 mb-0">
              {currentDate && formatDate(currentDate)}
            </h3> */}
            </aside>
            <aside className="flex justify-center items-center h-full">
              <button
                onClick={() => setIsModalOpen && setIsModalOpen(true)}
                className="font-Ubuntu font-medium bg-basicBlue text-[#FAFAFA] px-4 py-2 rounded-md flex justify-center items-center mr-6"
              >
                <FiUpload className="mr-2" /> Upload
              </button>
              <button
                type="submit"
                className="font-Ubuntu font-medium border border-basicBlue text-basicBlue rounded-md px-4 py-2 flex justify-center items-center"
              >
                <IoChatbubbleEllipsesOutline className="mr-2" /> Past
                Conversations
              </button>
            </aside>
          </main>
        </div>
      </div>
    </nav>
  );
};

export default DashMainNav;
