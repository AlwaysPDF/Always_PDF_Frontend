"use client";
import { useAppContext } from "@/components/ContextApi/ContextApi";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import fullColorLogo from "../../public/assets/fullColorLogo.png";
import Image from "next/image";

interface IsAuthNecessary {
  isAuth?: string;
}

interface IsButton extends IsAuthNecessary {
  isActive?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AuthHeader: React.FC<IsAuthNecessary> = ({ isAuth }) => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <div className="w-[50%]">
          <Image src={fullColorLogo} alt="Full Color Logo" className="w-full h-full" />
        </div>
        <p className="font-Ubuntu text-closedark text-[16px] mt-4 mb-1">
          {isAuth === "email"
            ? "Welcome to EverPDF"
            : isAuth === "verify"
              ? "Verify your email address"
              : isAuth === "create"
                ? "Input your details to create your profile"
                : "Glad to have you back!"}
        </p>
        <h1 className="text-deepblue font-Ubuntu font-medium text-2xl mb-6">
          {isAuth === "email"
            ? "Create a EverPDF Account"
            : isAuth === "verify"
              ? "Enter the OTP sent to your Email"
              : isAuth === "create"
                ? "Account Creation"
                : "Sign In to your account"}
        </h1>
      </div>
    </section>
  );
};

export const AuthButton: React.FC<IsButton> = ({
  isAuth,
  isActive,
  handleClick,
}) => {
  const { loadingActive } = useAppContext();

  return (
    <div className="w-full flex justify-end items-center">
      <button
        className={`button-shadow  px-12 py-2 text-white rounded-lg ${isActive ? "bg-deepblue" : "bg-grey"}`}
        disabled={!isActive}
        onClick={handleClick}
      >
        {loadingActive ? (
          <ClipLoader color="#ffffff" size={15} />
        ) : isAuth === "email" ? (
          "Next"
        ) : isAuth === "verify" ? (
          "Confirm"
        ) : isAuth === "create" ? (
          "Sign Up"
        ) : (
          "Sign In"
        )}
      </button>
    </div>
  );
};

export const AuthIsSignUp: React.FC<IsAuthNecessary> = ({ isAuth }) => {
  return (
    <div>
      <p className="font-Ubuntu font-medium text-sm ">
        {isAuth !== "signin"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          className="ml-2 text-deepblue"
          href={isAuth !== "signin" ? "/auth/signin" : "/auth/email"}
        >
          {isAuth !== "signin" ? "Sign In" : "Sign up here!"}
        </Link>
      </p>
    </div>
  );
};
