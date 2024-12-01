"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../ContextApi/ContextApi";
import { BounceLoader } from "react-spinners";
import ChatContainer from "./ChatContainer";

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import logger from 'logging-library';
// import FileViewer from "react-file-viewer";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";

interface Token {
  token?: string;
}

// const ErrorComponent  = () => (
//   <div>
//     <p>An error occurred while viewing the file.</p>
//     <button
//       className="px-6 py-2 bg-deepblue rounded-md"
//       onClick={() => window.location.reload()}
//     >
//       Retry
//     </button>
//   </div>
// );

const AllConversations: React.FC<Token> = ({ token }) => {
  const {
    loadingActive,
    setLoadingActive,
    setToastMessage,
    setShowToast,
    pdfUrl,
    setPdfUrl,
    setPdfText,
  } = useAppContext();

  // const [currentDocument, setCurrentDocument] = useState(0);

  const docs = [
    {
      uri:
        pdfUrl ||
        "https://firebasestorage.googleapis.com/v0/b/alwayspdf-8bb50.appspot.com/o/documents%2FMantra_MFS100_RD_Service_Manual_Windows_1.1.0.pdf-6986523105?alt=media&token=f9373df9-b9de-4ad1-82fa-544c21489899",
      fileType: "pdf",
    }, // Remote file
  ];

  useEffect(() => {
    const getPdfText = async () => {
      if (token) {
        setLoadingActive?.(true);

        axiosInstanceWithHeader
          .post(`/questions/upload/${token}`, { pdfUrl })
          .then((response) => {
            if (response?.data?.success === true) {
              setPdfText?.(response?.data?.pdfText);
            }
          })
          .catch((err: any) => {
            setToastMessage?.({
              text:
                err?.response?.data?.errors?.[0]?.message ||
                "We are unable to find a user for this token. Token may have expired",
              type: "error",
            });
            setShowToast?.(true);
          })
          .finally(() => {
            setLoadingActive?.(false);
          });
      }
    };

    getPdfText();
  }, [token]);

  return (
    <section className="flex justify-center items-center w-full h-screen bg-white overflow-x-hidden">
      {/* <div className="mb-4">Connection Status: {connectionStatus}</div> */}
      {loadingActive ? (
        <BounceLoader color="#25076B" size={120} />
      ) : (
        <div className="grid grid-cols-2 llg:grid-cols-1 gap-4 llg:gap-2 w-full">
          <aside className="w-full bg-white rounded-xl flex justify-center items-center">
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
              style={{ height: 500, width: "100%" }}
            />
            {/* <div className="w-full">{pdfText}</div> */}
            {/* <iframe
              src={`${file}#view=FitH`}
              className="w-full h-[80vh]"
              title="PDF Document"
            /> */}

            {/* <FileViewer
              fileType={type}
              filePath={file}
              // errorComponent={<CustomErrorComponent />}
              onError={onError}
            /> */}
          </aside>
          <aside className="h-[90vh] flex justify-center items-start w-full mt-8">
            <ChatContainer token={token} />
          </aside>
        </div>
      )}
    </section>
  );
};

export default AllConversations;
