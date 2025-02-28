"use client";

import { AuthButton, AuthHeader, AuthIsSignUp } from "@/utils/AuthNecessary";
import FormRow from "@/utils/FormRow";
import Cookies from "js-cookie";
import { useAppContext } from "../ContextApi/ContextApi";
import { useState } from "react";
import Toastify from "@/utils/Toastify";
import { axiosInstance } from "@/utils/AxiosHeader";
import Link from "next/link";

interface FormErrors {
  [key: string]: string;
}

interface UserDetails {
  email: string;
  password: string;
}

const Signin = () => {
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
    return ["email", "password"].includes(key);
  };

  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newUserDetails = { ...userDetails, [name]: value };
    setUserDetails(newUserDetails); // Update userDetails state

    if (setIsActive) {
        const { email = "", password = "" } = newUserDetails;

      // Email validation regex
      const emailIsValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Password validation regex: at least one lowercase, one uppercase, one number, one special character, and minimum 8 characters
      const passwordIsValid = (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
          password
        );

      // Check the validation for both fields
      if (
        emailIsValid(email) &&
        passwordIsValid(password)
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate the form values
    const errors: FormErrors = {};
    if (userDetails) {
      (["email", "password"] as const).forEach((field) => {
        if (isUserDetailsKey(field)) {
          const value = userDetails[field]?.trim() || "";
          if (!value) {
            console.error(`Error: Empty field - ${field}`);
            errors[field] = `${
              field === "email" ? "Email address" : "password"
            } is required.`;
            
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
      if (setLoadingActive) {
        setLoadingActive(true);
      }

      axiosInstance
        .post("/auth/login", userDetails)
        .then((response) => {
          if (response?.data?.success === true) {
            Cookies.set("UserToken", response?.data?.token, {
              expires: 1,
              secure: true,
            });
            window.location.href = "/dashboard/my-documents";
              setToastMessage?.({
                text: response?.data?.msg || "Login successfuly",
                type: "success",
              });
              setShowToast?.(true);
            // Redirect to home page
          } else {
            setToastMessage?.({
                text: response?.data?.msg || "Incorrect credentials",
                type: "error",
              });
            }
        })
        .catch((err) => {
            setToastMessage?.({
              text: err?.response?.data?.msg || "Incorrect credentials",
              type: "error",
            });
            setShowToast?.(true);
        })
        .finally(() => {
            setUserDetails?.({ email: "", password: "" });
            setLoadingActive?.(false);
        });
    }
  };

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-xl border border-[#DEDEDE]">
      <div className="flex justify-center items-center flex-col w-[90%] py-8">
        <AuthHeader />
        <form className="w-full flex justify-center items-center mb-14 flex-col">
          <FormRow
            type="email"
            name="email"
            value={userDetails?.email}
            placeHolder="Input your e-mail address"
            labelText="Email Address"
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-4"
          />
          <FormRow
            type="password"
            name="password"
            value={userDetails?.password}
            placeHolder="Input your password"
            labelText="Password"
            password={true}
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-2"
          />
          <div className="flex justify-end items-center w-full">
            <Link href="/auth/forgot-password" className="mb-10 text-basicBlue font-semibold">Forgot Password?</Link>
          </div>
          <AuthButton isActive={isActive} handleClick={handleClick} />
        </form>
        <AuthIsSignUp isAuth="signin" />
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

export default Signin;
