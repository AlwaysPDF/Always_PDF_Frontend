import OTP from "@/components/Auth/OTP";

import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const VerifyEmails = () => {
  return (
    <main>
      <AuthWrapper>
        <OTP />
      </AuthWrapper>
    </main>
  );
};

export default VerifyEmails;
