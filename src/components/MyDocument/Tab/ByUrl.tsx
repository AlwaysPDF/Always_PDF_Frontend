"use client";
import React, { useState } from "react";

import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useAppContext } from "@/components/ContextApi/ContextApi";
import { VscLink } from "react-icons/vsc";
import { FaLink } from "react-icons/fa6";
import Toastify from "@/utils/Toastify";

import { ClipLoader } from "react-spinners";

const ByUrl = () => {
  const {
    isActive,
    setIsActive,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    handleToastClose,
    setIsModalOpen,
    loadingActive,
    setLoadingActive,
  } = useAppContext();
  const [fileUrl, setFileUrl] = useState<string>("");

  const sendDocumentInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstanceWithHeader.post(
        "/documentUpload/uploadDocumentByURL",
        { fileUrl }
      );
      console.log(response);

      if (response?.data?.success === true) {
        if (setToastMessage) {
          setToastMessage({
            text: response?.data?.msg || "Document uploaded successfully",
            type: "success",
          });
        }
        if (setShowToast) {
          setShowToast(true);
        }
        if (setIsModalOpen) {
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Failed to send document info:", error);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-[80%] mb-10">
        <main className="dotDash w-full flex justify-center items-center">
          <aside className="w-[90%]">
            <div className="ant-upload-drag-icon w-full flex justify-center items-center mt-4">
              <div className="size-[48px] bg-[#F0F2F5] rounded-full flex justify-center items-center">
                <VscLink className="text-[#475367] text-2xl" />
              </div>
            </div>

            <div className="flex justify-between py-2 px-4 items-center w-full mt-6 border border-[#DEDEDE] rounded-lg">
              <FaLink className="text-[#151515] flex- text-2xl" />
              <input
                type="url"
                name=""
                id=""
                placeholder="https://docs.google.com/yourdocument"
                className="px-2 outline-none focus:outline-none flex-1"
                onChange={(e) => {
                  const url = e.target.value;
                  setFileUrl(url);

                  // Check if the value is empty to toggle `isActive` state
                  if (setIsActive) {
                    setIsActive(url.length > 0);
                  }
                }}
              />
              <button
                className={`px-8 py-2 text-white rounded-lg ${isActive ? "bg-deepblue" : "bg-grey"}`}
                disabled={!isActive}
                onClick={(e) => sendDocumentInfo(e)}
              >
                {loadingActive ? (
                  <ClipLoader color="#ffffff" size={15} />
                ) : (
                  "Get Document"
                )}
              </button>
            </div>

            <p className="ant-upload-text font-Ubuntu text-offwhite pt-1 text-center mb-4">
              Supported links:{" "}
              <b className="font-Ubuntu text-[#BABABA]">Google docs</b>
            </p>
          </aside>
        </main>
      </div>
      {showToast && (
        <Toastify
          text={toastMessage?.text}
          type={toastMessage?.type}
          onClose={handleToastClose}
        />
      )}
    </section>
  );
};

export default ByUrl;
