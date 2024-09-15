"use client";

import { FiUpload } from "react-icons/fi";
import { useAppContext } from "../ContextApi/ContextApi";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { useState } from "react";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import SingleDocument from "./SingleDocument";

// import { RiDeleteBin5Line } from "react-icons/ri";

const FilledDocument = () => {
  const router = useRouter();
  const { setIsModalOpen, documents, setPdfUrl } = useAppContext();

  const [searchContact, setSearchContact] = useState("");
  // search docs
  // search docs

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "dd MMM, yyyy | hh:mmaaa");
  };

  const formatFileSize = (sizeInBytes: number): string => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
  };

  const handleNavigate = (documentId: string, fileUrl: string) => {
    router.push(`/dashboard/conversations/${documentId}`);
    if (setPdfUrl) {
      setPdfUrl(fileUrl);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      const response = await axiosInstanceWithHeader.delete(
        `/documentUpload/document/${documentId}`
      );
      console.log(response.data.msg);
    } catch (error) {
      console.error("Error deleting file:", error);
    }finally{

    }
  };

  return (
    <section className="flex justify-center items-center w-full">
      <div className="grid grid-cols-2 gap-20 w-full">
        <aside className="w-full bg-white rounded-xl flex justify-center items-center">
          <div className=" w-[90%]">
            <div className="w-full">
              <h1 className="font-Ubuntu text-[#151515] font-bold text-2xl">
                My Documents
              </h1>
              <div className="">
                <input
                  type="text"
                  placeholder="Search documents"
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="w-full py-2 px-2 focus:outline-none border border-[#DEDEDE] rounded-md text-grey text-sm mt-2"
                />
              </div>
            </div>
            <main className="w-full mt-8 overflow-y-scroll h-[60vh] filled-document">
              <div className="grid grid-cols-1 gap-4 w-full">
                {documents?.map((doc, i) => (
                  <SingleDocument
                    doc={doc}
                    key={i}
                    formatDate={formatDate}
                    formatFileSize={formatFileSize}
                    handleNavigate={handleNavigate}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </main>
          </div>
        </aside>
        <aside className=" h-[80vh] flex justify-center items-start flex-col">
          <div className="w-[80%]">
            <h1 className="font-Ubuntu text-[#151515] font-bold text-3xl mb-2">
              Select a Document
            </h1>
            <p className="font-Ubuntu text-sm text-[#7A7A7A] font-normal">
              Choose from your existing documents to open your previous
              conversation or upload a new document
            </p>
            <button
              onClick={() => setIsModalOpen && setIsModalOpen(true)}
              className="bg-basicBlue text-[#FAFAFA] px-4 py-2 rounded-md flex justify-center items-center mt-6"
            >
              <FiUpload className="mr-2" /> Upload a new PDF
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FilledDocument;
