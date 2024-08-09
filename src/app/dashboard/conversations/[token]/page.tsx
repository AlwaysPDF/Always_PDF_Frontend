"use client";
import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";
import AllConversations from "@/components/Conversations/AllConversations";
import { useState } from "react";

const Wrapper = dynamic(() => import("@/utils/Wrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const ConversationWithId = ({ params }: { params: { token: string } }) => {
  const [token, setToken] = useState<string>(params?.token);

  return (
    <Wrapper>
      <main className="lg:pl-[220px] w-full">
        <AllConversations token={token} />
      </main>
    </Wrapper>
  );
};

export default ConversationWithId;
