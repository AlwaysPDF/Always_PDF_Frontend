"use client";

import { AuthButton, AuthHeader, AuthIsSignUp } from "@/utils/AuthNecessary";
import FormRow from "@/utils/FormRow";
import Cookies from "js-cookie";
import { useAppContext } from "../ContextApi/ContextApi";
import Toastify from "@/utils/Toastify";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/AxiosHeader";

interface FormErrors {
  [key: string]: string;
}

interface UserDetails {
  verificationToken: string;
}

const OTP = () => {
  const {
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    formErrors,
    setFormErrors,
    handleBlur,
    isActive,
    setIsActive,
    handleToastClose,
    loadingActive,
    setLoadingActive,
  } = useAppContext();

  const isUserDetailsKey = (key: string): key is keyof UserDetails => {
    return ["verificationToken"].includes(key);
  };

  const [userDetails, setUserDetails] = useState<UserDetails>({
    verificationToken: "",
  });

  // the onchange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setincorrectpass(false);
    if (name === "number") {
      // Allow only numbers
      if (!/^\d*$/.test(value)) return;
    }

    if (userDetails) {
      setUserDetails?.({ ...userDetails, [name]: value }); // Type assertion (optional)
    }
    if (setIsActive) {
      if (name === "verificationToken" && value.length < 4) {
        setIsActive(false);
      } else {
        setIsActive(true);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate the form values
    const errors: FormErrors = {};
    if (userDetails) {
      (["verificationToken"] as const).forEach((field) => {
        if (isUserDetailsKey(field)) {
          const value = userDetails[field]?.trim() || "";
          if (!value) {
            console.error(`Error: Empty field - ${field}`);
            errors[field] = `${
              field === "verificationToken" && "OTP"
              // field.charAt(0).toUpperCase() + field.slice(1)
            } is required.`;
            // if (validateEmail) {
            //   if (userDetails.email && !validateEmail(userDetails.email)) {
            //     errors.email = "Invalid email address";
            //   }
            // }
          } else {
            delete errors[field];
          }
        }
      });
    }
    // ... validate other fields
    setFormErrors?.(errors);
    // Set a cookie
    if (
      Object.keys(errors).length === 0 &&
      userDetails.verificationToken.length === 4
    ) {
      setLoadingActive?.(true);

      const email = Cookies.get("UserEmail");

      axiosInstance
        .post("/auth/verifyEmail", { ...userDetails, email })
        .then((response) => {
          if (response?.data?.success === true) {
            window.location.href = "/auth/complete-signup";
            setToastMessage?.({
              text:
                response?.data?.msg ||
                "A confirmation code has been sent to your email address.",
              type: "success",
            });
            setShowToast?.(true);
            // Redirect to home page
          } else {
            setToastMessage?.({
              text: response?.data?.msg || "Email already exists",
              type: "error",
            });
          }
        })
        .catch((err) => {
          setToastMessage?.({
            text: err?.response?.data?.msg || "Email already exists",
            type: "error",
          });
          setShowToast?.(true);
        })
        .finally(() => {
          setUserDetails?.({ verificationToken: "" });
          setLoadingActive?.(false);
        });
    }
  };

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-xl border border-[#DEDEDE]">
      <div className="flex justify-center items-center flex-col w-[90%] py-8">
        <AuthHeader isAuth="verify" />
        <form className="w-full flex justify-center items-center mb-[10rem] flex-col">
          <FormRow
            type="number"
            name="verificationToken"
            value={userDetails?.verificationToken}
            placeHolder="Input OTP"
            labelText="OTP"
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-10"
          />
          <AuthButton
            isAuth="verify"
            isActive={isActive}
            handleClick={handleClick}
          />
        </form>
        <AuthIsSignUp />
      </div>
      {showToast && (
        <Toastify
          text={toastMessage?.text}
          type={toastMessage?.type}
          onClose={handleToastClose}
        />
      )}
    </section>
  );
};

export default OTP;
