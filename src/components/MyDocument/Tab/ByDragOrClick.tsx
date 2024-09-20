import { HiOutlineCloudUpload } from "react-icons/hi";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

import {
  getDownloadURL,
  ref,
  // uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/components/Firebase/Firebase";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useAppContext } from "@/components/ContextApi/ContextApi";
import Toastify from "@/utils/Toastify";

const ByDragOrClick = () => {
  const {
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    setIsModalOpen,
    handleToastClose,
    getDocuments,
  } = useAppContext();

  const [documentInfo, setDocumentInfo] = useState({
    fileType: "",
    fileUrl: "",
    fileName: "",
    fileSize: 0,
    fileExtension: "",
  });

  const uploadToFirebase = (file: any) => {
    // Generate a random number and append it to the file name
    const randomNum = Math.floor(Math.random() * 10000000000);
    const newFileName = `${file.name}-${randomNum}`;
    const storageRef = ref(storage, `documents/${newFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle error
        console.error(error);
        message.error(`${file.name} file upload failed.`);
      },
      async () => {
        // Handle success
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newDocumentInfo = {
            ...documentInfo,
            type: file.type,
            fileName: file.name,
            fileSize: file.size,
            fileUrl: downloadURL,
          };
          setDocumentInfo(newDocumentInfo);
          sendDocumentInfo(newDocumentInfo);
        } catch (error) {
          console.error("Error getting download URL", error);
        }
      }
    );
  };

  const isAllowedDocument = new RegExp(
    "^(?!.*.(?:png|jpg|jpeg|gif|bmp)$).+$",
    "i"
  );

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept:
      ".doc, .docx, .pdf, .xls, .xlsx, .ppt, .pptx, .txt, .rtf, .odt, .ods, .odp", // Ensure only image files are accepted
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    beforeUpload(file) {
      if (!isAllowedDocument.test(file.name)) {
        message.error(`${file.name} is not a supported document file.`);
        return Upload.LIST_IGNORE;
      }

      const fileExtension = file.name.split(".").pop() || "";

      setDocumentInfo({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileExtension: fileExtension,
        fileUrl: "",
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(`File type: ${file.type}`);
        // console.log(`File fileUrl: ${e.target.result}`);
      };
      reader.readAsDataURL(file); // or readAsText(file) for plain text files

      return true;
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        const file = info.file.originFileObj;
        if (file) {
          uploadToFirebase(file);
        } // Upload to Firebase
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const sendDocumentInfo = async (info: {
    fileType: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileExtension: string;
  }) => {
    try {
      const response = await axiosInstanceWithHeader.post(
        "/documentUpload/uploadDocumentByFile",
        info
      );
      console.log(response);

      if (response?.data?.success === true) {
        setToastMessage?.({
          text: response?.data?.msg || "Document uploaded successfully",
          type: "success",
        });
        setShowToast?.(true);
        setIsModalOpen?.(false);
        getDocuments?.();
      }
    } catch (error) {
      console.error("Failed to send document info:", error);
    }
  };

  return (
    <section className="flex justify-center items-center w-full">
      <div className="w-[80%] mb-10">
        <Dragger {...props}>
          <div className="ant-upload-drag-icon w-full flex justify-center items-center">
            <div className="size-[48px] bg-[#F0F2F5] rounded-full flex justify-center items-center">
              <HiOutlineCloudUpload className="text-[#475367] text-2xl" />
            </div>
          </div>
          <p className="ant-upload-text font-Inter text-[#475367] pt-4">
            <b className="text-basicBlue font-Ubuntu">Click to upload (pdf)</b>{" "}
            or drag and drop{" "}
          </p>

          <div className="flex justify-center items-center w-full my-6">
            <div className="flex justify-between items-center w-[70%] mb-2">
              <hr className="w-[45%] bg-[#F0F2F5]" />
              <p className="w-[8%] font-bold text-[#98A2B3] font-Helvetica text-center">
                OR
              </p>
              <hr className="w-[45%] bg-[#F0F2F5]" />
            </div>
          </div>

          <div className="ant-upload-hint mb-4">
            <button
              type="submit"
              className="font-Inter bg-basicBlue rounded-lg py-2 px-6 text-white font-semibold"
            >
              Browse Files
            </button>
          </div>
        </Dragger>
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

export default ByDragOrClick;
