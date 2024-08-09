import AccountCreation from "@/components/Auth/AccountCreation";
import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const CompleteSignups = () => {
  return (
    <main>
      <AuthWrapper>
        <AccountCreation />
      </AuthWrapper>
    </main>
  );
};

export default CompleteSignups;
