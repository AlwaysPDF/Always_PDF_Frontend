import AllDocument from "@/components/MyDocument/AllDocument";

import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const Wrapper = dynamic(() => import("@/utils/Wrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const MyDocuments = () => {
  return (
    <Wrapper>
      <main className="lg:pl-[220px] w-full">
        <AllDocument />
      </main>
    </Wrapper>
  );
};

export default MyDocuments;
