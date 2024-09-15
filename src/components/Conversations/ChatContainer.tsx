import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import ChatInput from "./ChatInput";
import { axiosInstance, axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useAppContext } from "../ContextApi/ContextApi";

type Chat = {
  // Define the structure of the chat if needed
  [key: string]: any;
};

interface SocketRef {
  socket: Socket | null;
  id: string | undefined;
}

interface ChatContainerProps {
  // currentChat: Chat | null;
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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const socketRef = useRef<SocketRef>({ socket: null, id: null });
  const [arrivalMessage, setArrivalMessage] = useState<ChatMessage | null>(
    null
  );
  const [currentChat, setCurrentChat] = useState(undefined);

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
    // .then(res => res.json())
    // .then(data => setMessages(data));

    // Listen for incoming messages
    // Listen for incoming messages
    if (socketRef.current?.socket) {
      socketRef.current.socket.on("msg-recieve", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup on component unmount
    return () => {
      socketRef.current.socket?.off("message");
    };
  }, []);

  const handleSendMsg = async (question: string) => {
    // if (!socket.current) return;
    if (!socketRef?.current?.socket) return;
    if (!question.trim()) return;

    socketRef.current.socket.emit("send-msg", {
      // to: currentChat._id,
      from: currentUser?.userId,
      pdfText: "My name is Ajibola, I am a boy, talk to me to fix this",
      documentId: token,
      question,
    });
    try {
      // setLoadingActive?.(true);
      await axiosInstanceWithHeader.post("/messages/addMessage", {
        // from: data._id,
        // to: currentChat._id,
        pdfText: "My name is Ajibola, I am a boy, talk to me to fix this",
        documentId: token,
        question,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: question });
      setMessages(msgs);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // setLoadingActive?.(false);
    }
  };

  useEffect(() => {
    if (socketRef.current.socket) {
      socketRef.current.socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Your component logic here
  return (
    <div>
      <div className="p-[1rem_2rem] flex flex-col gap-4 overflow-auto">
        {messages.map((message, i) => {
          return (
            <div ref={scrollRef} key={i}>
              <div
                className={`flex items-center ${message.fromSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    "max-w-[40%] llg:max-w-[70%] text-balance p-2 text-lg rounded-lg text-[color: #d1d1d1] "
                  }
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
