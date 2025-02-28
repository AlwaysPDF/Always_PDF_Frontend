"use client";
import { useAppContext } from "@/components/ContextApi/ContextApi";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import coloredLogo from "../../public/assets/coloredLogo.svg";
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
          <Image
            src={coloredLogo}
            alt="Full Color Logo"
            className="w-full h-full"
          />
        </div>
        <p className="font-Ubuntu text-offblack font-medium text-[16px] mt-4 mb-2">
          {isAuth === "email"
            ? "Welcome to AlwaysPDF"
            : isAuth === "verify"
              ? "Verify your email address"
              : isAuth === "create"
                ? "Input your details to create your profile"
                : isAuth === "forgot"
                  ? "Forgot your password?" : isAuth == "change" ? "Input your new set of password"
                  : "Glad to have you back!"}
        </p>
        <h1 className="text-basicBlue font-Ubuntu font-semibold text-xl mb-6 text-center">
          {isAuth === "email"
            ? "Create a AlwaysPDF Account"
            : isAuth === "verify"
              ? "Enter the OTP sent to your Email"
              : isAuth === "create"
                ? "Account Creation"
                : isAuth === "forgot"
                  ? "Enter email to reset your password" : isAuth === "change" ? "Change Password"
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
        className={`button-shadow  px-12 py-2 text-white rounded-lg ${isActive ? "bg-basicBlue" : "bg-grey"}`}
        disabled={!isActive}
        onClick={handleClick}
      >
        {loadingActive ? (
          <ClipLoader color="#ffffff" size={15} />
        ) : isAuth === "email" ? (
          "Next"
        ) : isAuth === "verify" ? (
          "Conitnue"
        ) : isAuth === "create" ? (
          "Sign Up"
        ) : isAuth === "forgot" ? (
          "Continue"
        ) : isAuth === "change" ? (
          "Save"
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
      <p className="font-Ubuntu font-semibold text-sm text-basicBlue">
        {isAuth !== "signin"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          className="ml-2 text-basicBlue font-Ubuntu font-semibold"
          href={
            isAuth !== "email" && isAuth !== "signin"
              ? "/auth/signin"
              : "/auth/email"
          }
        >
          {isAuth !== "email" && isAuth !== "signin"
            ? "Sign In"
            : "Sign up here!"}
        </Link>
      </p>
    </div>
  );
};
