import Email from "@/components/Auth/Email";
import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const Emails = () => {
  return (
    <main>
      <AuthWrapper>
        <Email />
      </AuthWrapper>
    </main>
  );
};

export default Emails;
