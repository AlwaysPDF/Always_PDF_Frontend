import InitiateForgotPassword from "@/components/Auth/InitiateForgotPassword";
import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const ForgotPassword = () => {
  return (
    <main>
      <AuthWrapper>
        <InitiateForgotPassword />
      </AuthWrapper>
    </main>
  );
};

export default ForgotPassword;
