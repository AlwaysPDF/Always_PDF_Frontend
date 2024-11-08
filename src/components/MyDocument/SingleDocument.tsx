import React from "react"

import Image from "next/image";
import pdf from "../../../public/assets/pdf.png";
import ppt from "../../../public/assets/ppt.png";
import docx from "../../../public/assets/docx.png";
import xls from "../../../public/assets/xls.png";

const SingleDocument: React.FC<any> = ({
  doc,
  formatDate,
  formatFileSize,
  handleNavigate,
  handleDelete,
}) => {
  return (
    <div
      className="flex justify-between items-center border-b border-[#DEDEDE] py-4"
    >
      <aside className="w-[10%] max-w-[60px] h-full">
        <Image
          src={
            doc?.fileExtension === "pdf"
              ? pdf
              : doc?.fileExtension === "docx" || doc?.fileExtension === "doc"
                ? docx
                : doc?.fileExtension === "ppt"
                  ? ppt
                  : xls
          }
          alt={doc?.fileName}
          priority
        />
      </aside>
      <aside className="max-w-[300px] lmd:max-w-[200px] w-[65%]">
        <div>
          <h1 className="font-semibold font-Inter text-sm lsm:text-[12px]">{doc?.fileName}</h1>
          <div className="flex justify-start items-center">
            <p className="font-Inter text-[#98A2B3] text-sm ">
              {formatDate(doc?.uploadDate)}
            </p>
            <div className="size-[5px] bg-[#98A2B3] rounded-full mx-1"></div>
            <p className="font-Inter text-[#98A2B3] text-sm ">
              {formatFileSize(doc?.fileSize)}
            </p>
          </div>
        </div>
      </aside>
      <aside className="flex justify-center items-center w-[20%]">
        <button
          className="border border-[#7A7A7A] bg-white text-[#7A7A7A] text-sm font-Ubuntu px-3 rounded-md"
          onClick={() => handleNavigate(doc?._id, doc?.fileUrl)}
        >
          view
        </button>
        <div onClick={() => handleDelete(doc?._id)}>
          <i className="fa-regular fa-trash-can text-[#7A7A7A] text-lg ml-2 cursor-pointer"></i>
        </div>
      </aside>
      {/* <img
                    className="w-[100%] h-[100%]"
                    src={doc.url}
                    alt={doc.name}
                  /> */}
    </div>
  );
};

export default SingleDocument;
