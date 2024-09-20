"use client";

import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppContext } from "../ContextApi/ContextApi";
import { BounceLoader } from "react-spinners";
import ChatContainer from "./ChatContainer";
import { io, Socket } from "socket.io-client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
// import logger from 'logging-library';
// import FileViewer from "react-file-viewer";
// import { CustomErrorComponent } from 'custom-error';
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
  const docs = [
    {
      uri:
        pdfUrl ||
        "https://firebasestorage.googleapis.com/v0/b/alwayspdf-8bb50.appspot.com/o/documents%2FMantra_MFS100_RD_Service_Manual_Windows_1.1.0.pdf-6986523105?alt=media&token=f9373df9-b9de-4ad1-82fa-544c21489899",
      fileType: "docx",
      fileName: "Sample demo.docx",
    }, // Remote file
  ];

  // const file =
  //   "https://docs.google.com/document/d/1hn_GhOoblmo4gShta01eb-3T2bqwC18qI2trQRym7dg";
  // const type = "docx";

  // const onError = (error: Error) => {
  //   console.error("Error in file viewer:", error);
  //   // You can add more error handling logic here, such as displaying an error message to the user
  // };

  const socketRef = useRef<SocketRef>({ socket: null, id: undefined });
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  // useEffect(() => {
  //   const getPdfText = async () => {
  //     if (token) {
  //       if (setLoadingActive) {
  //         setLoadingActive(true);
  //       }

  //       axiosInstanceWithHeader
  //         .post(`/questions/upload/${token}`, { pdfUrl })
  //         .then((response) => {
  //           if (response?.data?.success === true) {
  //             console.log(response?.data?.pdfText);
  //             setPdfText?.(response?.data?.pdfText);
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

  //   getPdfText();
  // }, [token]);

  // useEffect(() => {
  //   console.log(currentUser);
  //   if (currentUser) {
  //     // socket = io("http://localhost:5000");
  //     if (!socketRef.current.socket) {
  //       const socketUrl = process.env.NODE_ENV === "development"
  //         ? "http://localhost:5000"
  //         : "https://alwayspdf-backend.onrender.com";

  //       console.log("Attempting to connect to:", socketUrl);

  //       socketRef.current.socket = io(socketUrl, {
  //         transports: ['websocket'],
  //         upgrade: false,
  //         reconnection: true,
  //         reconnectionAttempts: 5,
  //         reconnectionDelay: 1000,
  //       });
  //       // console.log(socketRef.current);

  //       // Define the loggingFunction
  //       const handleConnect = (): void => {
  //         console.log("Socket connected:", socketRef.current.socket?.id);
  //         socketRef.current.socket?.emit("add-user", currentUser.userId);
  //         console.log("User added to socket:", currentUser.userId);
  //         setConnectionStatus("Connected");
  //       };

  //       const handleConnectError = (error: Error): void => {
  //         console.error("Connection error:", error);
  //         setConnectionStatus(`Error: ${error.message}`);
  //       };

  //       const handleDisconnect = (reason: string): void => {
  //         console.log("Disconnected:", reason);
  //         setConnectionStatus(`Disconnected: ${reason}`);
  //       };

  //       socketRef.current.socket.on("connect", handleConnect);
  //       socketRef.current.socket.on("connect_error", handleConnectError);
  //       socketRef.current.socket.on("disconnect", handleDisconnect);

  //       return () => {
  //         console.log("Cleaning up socket connection");
  //         socketRef.current.socket?.off("connect", handleConnect);
  //         socketRef.current.socket?.off("connect_error", handleConnectError);
  //         socketRef.current.socket?.off("disconnect", handleDisconnect);
  //         socketRef.current.socket?.disconnect();
  //       };
  //     }
  //   }
  // }, [currentUser]);

  console.log(socketRef.current.socket);

  const setupSocket = useCallback(() => {
    if (currentUser && !socketRef.current.socket) {
      const socketUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "https://alwayspdf-backend.onrender.com";

      console.log("Attempting to connect to:", socketUrl);

      socketRef.current.socket = io(socketUrl, {
        transports: ["websocket"],
        upgrade: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      const handleConnect = (): void => {
        console.log("Socket connected:", socketRef.current.socket?.id);
        socketRef.current.socket?.emit("add-user", currentUser.userId);
        console.log("User added to socket:", currentUser.userId);
        setConnectionStatus("Connected");
      };

      const handleConnectError = (error: Error): void => {
        console.error("Connection error:", error);
        setConnectionStatus(`Error: ${error.message}`);
      };

      const handleDisconnect = (reason: string): void => {
        console.log("Disconnected:", reason);
        setConnectionStatus(`Disconnected: ${reason}`);
      };

      socketRef.current.socket.on("connect", handleConnect);
      socketRef.current.socket.on("connect_error", handleConnectError);
      socketRef.current.socket.on("disconnect", handleDisconnect);
    }
  }, [currentUser]);

  useEffect(() => {
    setupSocket();

    return () => {
      console.log("Cleaning up socket connection");
      if (socketRef.current.socket) {
        socketRef.current.socket.off("connect");
        socketRef.current.socket.off("connect_error");
        socketRef.current.socket.off("disconnect");
        socketRef.current.socket.disconnect();
        socketRef.current.socket = null;
      }
    };
  }, [setupSocket]);

  // useEffect(()=>{
  //   socket.on("connect", () => {
  //     console.log("Socket connected:", socketRef.current.id);
  //     socket?.emit("add-user", currentUser.userId);
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.error("Connection error:", err);
  //   });

  //   socket.on("reconnect_attempt", (attempt) => {
  //     console.log(`Reconnection attempt #${attempt}`);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Socket disconnected");
  //   });
  // },[])

  return (
    <section className="flex justify-center items-center w-full h-screen bg-white overflow-hidden">
      <div className="mb-4">Connection Status: {connectionStatus}</div>
      {loadingActive ? (
        <BounceLoader color="#25076B" size={120} />
      ) : (
        <div className="flex gap-16 w-full">
          <aside className="w-full bg-white rounded-xl flex justify-center items-center">
            <DocViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              style={{ height: 500, width: "100%" }}
            />
            {/* <div className="w-full">{pdfText}</div> */}

            {/* <FileViewer
              fileType={type}
              filePath={file}
              errorComponent={CustomErrorComponent}
              onError={onError}
            /> */}
          </aside>
          <aside className="h-[90vh] flex justify-center items-start w-full mt-8 overflow-y-scroll -20">
            {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
            {socketRef.current.socket && (
              <ChatContainer token={token} socketRef={socketRef} />
            )}
          </aside>
        </div>
      )}
    </section>
  );
};

export default AllConversations;

// const CustomErrorComponent= (): JSX.Element => (
//   <div>
//     <p>An error occurred while viewing the file.</p>
//     <button>Retry</button>
//   </div>
// );
