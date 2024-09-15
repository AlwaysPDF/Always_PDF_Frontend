// ts-nocheck

import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { useAppContext } from "../ContextApi/ContextApi";

interface ChatFunctionDetails {
  handleSendMsg?: (question: string) => void;
}

interface EmojiObject {
  emoji: string;
  // Add other properties if needed
}

const ChatInput: React.FC<ChatFunctionDetails> = ({ handleSendMsg }) => {
  const { loadingActive } = useAppContext();
  const [question, setQuestion] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (
    // e: React.MouseEvent<HTMLButtonElement>,
    emojiObject: EmojiClickData
  ) => {
    let message = question;
    message += emojiObject.emoji;
    setQuestion(message);
  };

  const sendChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (question?.length > 0) {
      handleSendMsg?.(question);
      setQuestion("");
    }
  };

  return (
    // <Container>
    <section>
      <div className="button-container w-full">
        <div className="emoji">
          {/* <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} */}
        </div>
      </div>
      <form className="input-container flex justify-between items-center w-full">
        <input
          type="text"
          placeholder="Input your question about your document"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className="rounded-lg focus:outline-none w-[91%] border border-[#DEDEDE] px-4 py-2"
        />
        <button
          type="submit"
          onClick={(e) => sendChat(e)}
          className="bg-basicBlue w-[8%] py-3 flex justify-center items-center rounded-lg"
        >
          {loadingActive ? "active" : <IoMdSend className="text-white" />}
        </button>
      </form>
    </section>
    // </Container>
  );
};

export default ChatInput;
