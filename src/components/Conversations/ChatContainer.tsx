import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { Socket } from "socket.io-client";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useAppContext } from "../ContextApi/ContextApi";
import { PulseLoader } from "react-spinners";
import { marked } from "marked";

import halfLogo from "../../../public/assets/halfLogo.png";
import ChatInput from "./ChatInput";

interface ChatContainerProps {
  token?: string;
}

type ChatMessage = {
  fromSelf: boolean;
  message: string;
};

const ChatContainer: React.FC<ChatContainerProps> = ({
  token,
}) => {
  const { pdfText } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const [arrivalMessage, setArrivalMessage] = useState<ChatMessage | null>(
  //   null
  // );

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
  }, [token]);

  const handleSendMsg = async (question: string) => {
    if (!question.trim()) return;

    const newMessage = { fromSelf: true, message: question };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true); // Start loading state

    try {
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatResponseWithMarkdown = (response: string) => {
    // Convert markdown to HTML
    const htmlContent = marked(response);
    return <div className="spaces" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };
  

  // Your component logic here
  return (
    <main className="w-full flex justify-center items-center flex-col">
      <aside className="-[1rem_2rem] flex flex-col gap-4 w-full !overflow-y-scroll !h-[80vh] scrollbar mb-4">
        {messages.map((message, i) => {
          return (
            <div ref={scrollRef} key={i} className="w-full">
              <div
                className={`flex items-center max-w-full ${message.fromSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start px-2 text-lg rounded-md ${message.fromSelf ? "justify-end border border-[#DEDEDE] max-w-[95%] w-[95%]" : "justify-start max-w-[95%] w-[95%]"}`}
                >
                  {!message?.fromSelf && (
                    <div
                      className={`flex justify-center items-center ${!message?.fromSelf && "bg-basicBlue size-[30px] rounded-full mr-2"}`}
                    >
                      <Image
                        src={halfLogo}
                        alt="White version of company logo"
                        className="size-[60%]"
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
              className={`flex justify-center items-center bg-basicBlue size-[30px] rounded-full mr-2`}
            >
              <Image
                src={halfLogo}
                alt="White version of company logo"
                className="size-[60%]"
              />
            </div>
            <p className="w-full font-Ubuntu text-offblack">
              <PulseLoader
                color="#003366"
                margin={5}
                size={6}
                speedMultiplier={1}
              />
            </p>
          </div>
        )}
      </aside>
      <aside className="w-full llg:w-[90%] flex justify-end bottom-0">
        <ChatInput handleSendMsg={handleSendMsg} />
      </aside>
    </main>
  );
};

export default ChatContainer;
