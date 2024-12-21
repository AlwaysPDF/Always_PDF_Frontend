import ChangePassword from "@/components/Auth/ChangePassword";

import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const ChangePasswords = () => {
  return (
    <main>
      <AuthWrapper>
        <ChangePassword />
      </AuthWrapper>
    </main>
  );
};

export default ChangePasswords;
