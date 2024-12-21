import ResetVerify from "@/components/Auth/ResetVerify";

import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const ResetVerifys = () => {
  return (
    <main>
      <AuthWrapper>
        <ResetVerify />
      </AuthWrapper>
    </main>
  );
};

export default ResetVerifys;
