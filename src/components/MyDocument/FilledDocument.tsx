"use client";

import { FiUpload } from "react-icons/fi";
import { useAppContext } from "../ContextApi/ContextApi";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { useState } from "react";

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

  return (
    <section className="flex justify-center items-center w-full">
      <div className="grid grid-cols-2 gap-20 w-full">
        <aside className="w-full bg-white rounded-xl flex justify-center items-center">
          <div className=" w-[80%]">
            <div className="w-full">
              <h1 className="font-Ubuntu text-[#151515] font-bold text-2xl">
                My Documents
              </h1>
              <div className="">
                <input
                  type="text"
                  placeholder="Search documents"
                  onChange={(e) => setSearchContact(e.target.value)}
                />
              </div>
            </div>
            <main className="w-full">
              <div className="grid grid-cols-1 gap-4 w-full">
                {documents?.map((doc, i) => (
                  <div
                    key={i}
                    className="flex justify-start items-center border-b border-[#DEDEDE] py-4"
                    // onClick={() => setIsModalOpen && setIsModalOpen(true)}
                  >
                    <aside>
                      <div>
                        <h1 className="font-semibold font-Inter ">
                          {doc?.fileName}
                        </h1>
                        <div className="flex justify-start items-center">
                          <p className="font-Inter text-[#372d2d] text-sm ">
                            {formatDate(doc?.uploadDate)}
                          </p>
                          <div className="size-[6px] bg-[#98A2B3] rounded-full mx-2"></div>
                          <p className="font-Inter text-[#372d2d] text-sm ">
                            {formatFileSize(doc?.fileSize)}
                          </p>
                        </div>
                      </div>
                    </aside>
                    <aside>
                      <button
                        onClick={() => handleNavigate(doc?._id, doc?.fileUrl)}
                      >
                        view
                      </button>
                    </aside>
                    {/* <img
                    className="w-[100%] h-[100%]"
                    src={doc.url}
                    alt={doc.name}
                  /> */}
                  </div>
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
