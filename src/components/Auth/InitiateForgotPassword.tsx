"use client";

import { AuthButton, AuthHeader, AuthIsSignUp } from "@/utils/AuthNecessary";
import FormRow from "@/utils/FormRow";
import Cookies from "js-cookie";
import { useAppContext } from "../ContextApi/ContextApi";
import { useState } from "react";
import { axiosInstance } from "@/utils/AxiosHeader";
import Toastify from "@/utils/Toastify";

interface FormErrors {
  [key: string]: string;
}

interface UserDetails {
  email: string;
}

const InitiateForgotPassword = () => {
  const {
    isActive,
    setIsActive,
    showToast,
    setShowToast,
    handleToastClose,
    toastMessage,
    setToastMessage,
    handleBlur,
    formErrors,
    setLoadingActive,
    validateEmail,
    setFormErrors,
  } = useAppContext();

  const isUserDetailsKey = (key: string): key is keyof UserDetails => {
    return ["email"].includes(key);
  };

  const [userDetails, setUserDetails] = useState<UserDetails>({ email: "" });

  // the onchange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setincorrectpass(false);
    if (userDetails) {
      setUserDetails?.({ ...userDetails, [name]: value }); // Type assertion (optional)
    }
    if (setIsActive) {
      if (name === "email" && value.length === 0) {
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
      (["email"] as const).forEach((field) => {
        if (isUserDetailsKey(field)) {
          const value = userDetails[field]?.trim() || "";
          if (field === "email" && validateEmail && !validateEmail(value)) {
            errors.email = "Invalid email address";
          } else if (!value) {
            console.error(`Error: Empty field - ${field}`);
            errors[field] = `${
              field === "email"
                ? "Email address"
                : field === "name"
                  ? "Full name"
                  : "Password"
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
    if (Object.keys(errors).length === 0) {
        setLoadingActive?.(true);

      if (userDetails) {
        Cookies.set("UserEmail", userDetails.email, { secure: true });
      }

      axiosInstance
        .post("/auth/forgotPassword", userDetails)
        .then((response) => {
          if (response?.data?.success === true) {
            window.location.href = "/auth/reset-verify";
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
              text: response?.data?.msg || "Email not found",
              type: "error",
            });
          }
        })
        .catch((err) => {
          setToastMessage?.({
            text: err?.response?.data?.msg || "Error sending email",
            type: "error",
          });
          setShowToast?.(true);
        })
        .finally(() => {
          setUserDetails?.({ email: "" });
          setLoadingActive?.(false);
        });
    }
  };

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-xl border border-[#DEDEDE]">
      <div className="flex justify-center items-center flex-col w-[90%] py-8">
        <AuthHeader isAuth="forgot" />
        <form className="w-full flex justify-center items-center mb-[10rem] flex-col">
          <FormRow
            type="email"
            name="email"
            value={userDetails?.email}
            placeHolder="Input your e-mail address"
            labelText="Email address"
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-10"
          />
          <AuthButton
            isAuth="forgot"
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

export default InitiateForgotPassword;
