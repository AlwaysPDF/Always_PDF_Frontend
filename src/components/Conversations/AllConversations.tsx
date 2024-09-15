"use client";

import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../ContextApi/ContextApi";
import { BounceLoader } from "react-spinners";
import ChatContainer from "./ChatContainer";
import { io, Socket } from "socket.io-client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
// import FileViewer from 'react-file-viewer';

interface Token {
  token?: string;
}

type Chat = {
  // Define the structure of the chat if needed
  [key: string]: any;
};

interface SocketRef {
  socket: Socket | null;
  id: string | undefined;
}

const AllConversations: React.FC<Token> = ({ token }) => {
  const {
    loadingActive,
    setLoadingActive,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    pdfUrl,
    setPdfUrl,
    pdfText,
    setPdfText,
    currentUser,
  } = useAppContext();

  // const socket = useRef<Socket | null>(null);
  // const socket = io();

  const documentUrl =
    "https://firebasestorage.googleapis.com/v0/b/alwayspdf-8bb50.appspot.com/o/documents%2FAdeyemo%20Ajibola%20Isaac%20Course%20Reg%20200lv%20Rain.pdf";
  const docs = [
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/alwayspdf-8bb50.appspot.com/o/documents%2FLibrary%20works.pdf-8630587821?alt=media&token=aaad593a-ec4f-4c17-998e-bb70321a703e",
      fileType: "pdf",
      fileName: "Sample demo.docx",
    }, // Remote file
  ];

  const socketRef = useRef<SocketRef>({ socket: null, id: undefined });
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  // useEffect(() => {
  //   const verifyEmail = async () => {
  //     if (token) {
  //       if (setLoadingActive) {
  //         setLoadingActive(true);
  //       }

  //       axiosInstanceWithHeader
  //         .post(`/questions/upload/${token}`, { pdfUrl })
  //         .then((response) => {
  //           if (response?.data?.success === true) {
  //             setPdfText(response?.data?.pdfText);
  //             if (setToastMessage) {
  //               setToastMessage({
  //                 text:
  //                   response?.data?.msg ||
  //                   "A confirmation code has been sent to your email address.",
  //                 type: "success",
  //               });
  //             }
  //             if (setShowToast) {
  //               setShowToast(true);
  //             }
  //             // Redirect to home page
  //             //   window.location.href = "/auth/signin";
  //           }
  //         })
  //         .catch((err) => {
  //           if (setToastMessage) {
  //             setToastMessage({
  //               text:
  //                 err?.response?.data?.errors?.[0]?.message ||
  //                 "We are unable to find a user for this token. Token may have expired",
  //               type: "error",
  //             });
  //           }
  //           if (setShowToast) {
  //             setShowToast(true);
  //           }
  //           // window.location.href = "/verify-email";
  //         })
  //         .finally(() => {
  //           if (setLoadingActive) {
  //             setLoadingActive(false);
  //           }
  //         });
  //     }
  //   };

  //   verifyEmail();
  // }, [token]);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      // socket = io("http://localhost:5000");
      const newSocket = io("http://localhost:5000");
      console.log(newSocket);
      console.log(newSocket.connected);
      // if (newSocket.connected === true) {
      socketRef.current = { socket: newSocket, id: newSocket.id };
      console.log(socketRef);

      // Log connection and error events
      newSocket.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        newSocket?.emit("add-user", currentUser.userId);
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
      // socket.current = io("http://localhost:5000");
      // socket.current.emit("add-user", currentUser.userId);

      // Optional cleanup to disconnect the socket when component unmounts
      if (newSocket.connected) {
        return () => {
          newSocket?.disconnect();
        };
      }
    }
    // }
  }, [currentUser]);

  return (
    <section className="flex justify-center items-center w-full">
      {loadingActive ? (
        <BounceLoader color="#25076B" size={120} />
      ) : (
        <div className="grid grid-cols-2 gap-16 w-full">
          <aside className="w-full bg-white rounded-xl flex justify-center items-center">
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: 500, width: 1000 }}
            />
            {/* <div className="w-full">{pdfText}</div> */}
          </aside>
          <aside className="h-[90vh] relative flex justify-center items-start flex-col w-full">
            <div className="container absolute bottom-0 w-full">
              {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
              {socketRef.current.socket && (
                <ChatContainer token={token} socketRef={socketRef} />
              )}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default AllConversations;
