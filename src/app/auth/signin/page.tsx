import Signin from "@/components/Auth/Signin";
import dynamic from "next/dynamic";
import Loading from "@/utils/Loading";

const AuthWrapper = dynamic(() => import("@/components/Auth/AuthWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const Signins = () => {
  return (
    <main>
      <AuthWrapper>
        <Signin />
      </AuthWrapper>
    </main>
  );
};

export default Signins;
