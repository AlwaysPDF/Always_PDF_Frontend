import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useAppContext } from "../ContextApi/ContextApi";
import { PulseLoader } from "react-spinners";
import { marked } from "marked";

import halfLogo from "../../../public/assets/halfLogo.png";
import ChatInput from "./ChatInput";

interface SocketRef {
  socket: Socket | null;
  id: string | undefined;
}

interface ChatContainerProps {
  token?: string;
  socketRef: MutableRefObject<SocketRef>;
}

type ChatMessage = {
  fromSelf: boolean;
  message: string;
};

const ChatContainer: React.FC<ChatContainerProps> = ({
  // currentChat,
  token,
  socketRef,
}) => {
  const { currentUser, setLoadingActive, pdfText } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const socketRef = useRef<SocketRef>({ socket: null, id: null });
  const [arrivalMessage, setArrivalMessage] = useState<ChatMessage | null>(
    null
  );

  useEffect(() => {
    // Load initial chat history (optional)
    const fetchMessage = async () => {
      try {
        const res = await axiosInstanceWithHeader.get(
          `/messages/getMessages/${token}`
        ); // Adjust the endpoint as needed
        setMessages(res.data.projectedMessages);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
    fetchMessage();

    // Set up socket message handler
    const handleReceiveMessage = (msg: string) => {
      setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
      setIsLoading(false);
    };

    if (socketRef.current?.socket) {
      socketRef.current.socket.on("msg-recieve", (message) => {
        // setMessages((prevMessages) => [...prevMessages, message]);
        // setIsLoading(false);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current?.socket) {
        socketRef.current.socket.off("msg-recieve", handleReceiveMessage);
      }
    };
  }, [token, socketRef]);

  const handleSendMsg = async (question: string) => {
    // if (!socket.current) return;
    if (!socketRef?.current?.socket || !question.trim()) return;

    const newMessage = { fromSelf: true, message: question };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true); // Start loading state

    socketRef.current.socket.emit("send-msg", {
      from: currentUser?.userId,
      pdfText,
      documentId: token,
      question,
    });
    try {
      // setLoadingActive?.(true);
      const res = await axiosInstanceWithHeader.post("/messages/addMessage", {
        pdfText,
        documentId: token,
        question,
      })
      if (res.data.success) {
        setMessages((prev) => [...prev, { fromSelf: false, message: res.data.aiMessage.message }])
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (socketRef.current.socket) {
  //     socketRef.current.socket.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //       setIsLoading(false);
  //       console.log(msg);
  //     });
  //   }
  // }, [socketRef.current.socket]);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  console.log(arrivalMessage);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatResponseWithMarkdown = (response) => {
    // Convert markdown to HTML
    const htmlContent = marked(response);
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  // const formatResponse = (response) => {
  //   // Handle line breaks and code blocks in the response
  //   return response.split('\n').map((line, index) => {
  //     if (line.startsWith("```") && line.endsWith("```")) {
  //       // Handle inline code
  //       return (
  //         <pre key={index} style={{ background: "#f5f5f5", padding: "10px" }}>
  //           <code>{line.replace(/```/g, '')}</code>
  //         </pre>
  //       );
  //     } else if (line.startsWith("```")) {
  //       // Start of a code block
  //       return (
  //         <pre key={index} style={{ background: "#f5f5f5", padding: "10px" }}>
  //           <code>{line.replace("```", "")}</code>
  //         </pre>
  //       );
  //     } else if (line.endsWith("```")) {
  //       // End of a code block
  //       return (
  //         <pre key={index} style={{ background: "#f5f5f5", padding: "10px" }}>
  //           <code>{line.replace("```", "")}</code>
  //         </pre>
  //       );
  //     }
  //     return <p key={index}>{line}</p>;
  //   });
  // };
  

  // Your component logic here
  return (
    <main className="w-full flex justify-center items-center flex-col">
      <aside className="-[1rem_2rem] flex flex-col gap-4 w-full">
        {messages.map((message, i) => {
          return (
            <div ref={scrollRef} key={i} className="w-full">
              <div
                className={`flex items-center max-w-full ${message.fromSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start p-2 text-lg rounded-md ${message.fromSelf ? "justify-end border border-[#DEDEDE] max-w-[85%] w-[85%]" : "justify-start max-w-[85%] w-[85%]"}`}
                >
                  {!message?.fromSelf && (
                    <div
                      className={`flex justify-center items-center ${!message?.fromSelf && "bg-basicBlue size-[40px] rounded-full mr-2"}`}
                    >
                      <Image
                        src={halfLogo}
                        alt="White version of company logo"
                        className="size-[70%]"
                      />
                    </div>
                  )}
                  <div className="w-full font-Ubuntu text-offblack">
                    {message.message && formatResponseWithMarkdown(message.message)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div
            className={`flex items-center p-2 text-lg rounded-md justify-center max-w-[85%] w-[85%]`}
          >
            <div
              className={`flex justify-center items-center bg-basicBlue size-[40px] rounded-full mr-2`}
            >
              <Image
                src={halfLogo}
                alt="White version of company logo"
                className="size-[70%]"
              />
            </div>
            <p className="w-full font-Ubuntu text-offblack">
              <PulseLoader
                color="#003366"
                margin={5}
                size={10}
                speedMultiplier={1}
              />
            </p>
          </div>
        )}
      </aside>
      <aside className="w-[30%] llg:w-[90%] flex justify-end fixed bottom-0">
        <ChatInput handleSendMsg={handleSendMsg} />
      </aside>
    </main>
  );
};

export default ChatContainer;
