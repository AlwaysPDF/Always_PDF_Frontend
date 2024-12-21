"use client";

import { AuthButton, AuthHeader, AuthIsSignUp } from "@/utils/AuthNecessary";
import FormRow from "@/utils/FormRow";
import Cookies from "js-cookie";
import { useAppContext } from "../ContextApi/ContextApi";
import { useState } from "react";
import Toastify from "@/utils/Toastify";
import { axiosInstance } from "@/utils/AxiosHeader";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

interface FormErrors {
  [key: string]: string;
}

interface UserDetails {
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
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
        setLoadingActive,
    criteria,
    setCriteria,
  } = useAppContext();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    newPassword: "",
    confirmPassword: "",
  });

  const isUserDetailsKey = (key: string): key is keyof UserDetails => {
    return ["newPassword", "confirmPassword"].includes(key);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newUserDetails = { ...userDetails, [name]: value || "" };
    setUserDetails?.(newUserDetails); // Update userDetails state
    if (setIsActive) {
      const { newPassword = "", confirmPassword = "" } = newUserDetails;

      // Email validation regex
      // const emailIsValid = (email: string) =>
      //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Password validation regex: at least one lowercase, one uppercase, one number, one special character, and minimum 8 characters
      const passwordIsValid = (newPassword: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
          newPassword
        );

      // Check the validation for both fields
      if (passwordIsValid(newPassword) && confirmPassword) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }

    if (name === "newPassword") {
      if (value) {
        setCriteria?.({
          hasLowerCase: /[a-z]/.test(value),
          hasUpperCase: /[A-Z]/.test(value),
          hasNumber: /[0-9]/.test(value),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
          hasMinLength: value.length >= 8,
        });
      } else {
        setCriteria?.({
          hasLowerCase: false,
          hasUpperCase: false,
          hasNumber: false,
          hasSpecialChar: false,
          hasMinLength: false,
        });
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate the form values
    const errors: FormErrors = {};
    if (userDetails) {
      (["newPassword", "confirmPassword"] as const).forEach((field) => {
        if (isUserDetailsKey(field)) {
          const value = userDetails[field]?.trim() || "";
          if (!value) {
            console.error(`Error: Empty field - ${field}`);
            errors[field] = `${
              field === "newPassword" ? "Password" : "Confirm password"
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

      // Check if passwords match
    if (userDetails.newPassword !== userDetails.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      } 
    }
    // ... validate other fields
    setFormErrors?.(errors);
    // Set a cookie
    if (
      Object.keys(errors).length === 0 &&
      criteria?.hasLowerCase === true &&
      criteria?.hasUpperCase === true &&
      criteria?.hasSpecialChar === true &&
      criteria?.hasNumber === true &&
      criteria?.hasMinLength === true
    ) {
        setLoadingActive?.(true);

      const email = Cookies.get("UserEmail");

      axiosInstance
        .patch("/auth/changePassword", { ...userDetails, email })
        .then((response) => {
          if (response?.data?.success === true) {
            window.location.href = "/auth/signin";
              setToastMessage?.({
                text: response?.data?.msg || "Password changed successfuly",
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
          setUserDetails?.({ newPassword: "", confirmPassword: "" });

          setCriteria?.({
            hasLowerCase: null,
            hasUpperCase: null,
            hasNumber: null,
            hasSpecialChar: null,
            hasMinLength: null,
          });
          setLoadingActive?.(false);
        });
    }
  };

  const getLabelStyle = (isValid: any) => ({
    color: isValid === null ? "#525866" : isValid ? "#25076B" : "#DF1C41",
  });

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-xl border border-[#DEDEDE]">
      <div className="flex justify-center items-center flex-col w-[90%] py-8">
        <AuthHeader isAuth="change" />
        <form className="w-full flex justify-center items-center mb-8 flex-col">
          <FormRow
            type="password"
            name="newPassword"
            value={userDetails?.newPassword}
            placeHolder="Input your new password"
            labelText="New Password"
            password={true}
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-2"
          />
          <div className="mb-4 mt-2 font-Ubuntu w-full">
            <p className="text-[#999999] mb-2 font-medium font-Ubuntu text-[16px]">
              Your password should contain:
            </p>
            <label
              className="mb-2 text-grey flex justify-start items-center text-sm font-Ubuntu"
              style={getLabelStyle(criteria && criteria.hasLowerCase)}
            >
              {/* <input
                    type="radio"
                    checked={criteria && criteria.hasLowerCase}
                    readOnly
                    className="mr-2 "
                    style={getRadioStyle(criteria && criteria.hasLowerCase)}
                  /> */}
              <span className="mr-2 ">
                {criteria && criteria?.hasLowerCase ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </span>
              A lowercase letter (a)
            </label>
            <label
              className="mb-2 text-grey flex justify-start items-center text-sm font-Ubuntu"
              style={getLabelStyle(criteria && criteria.hasUpperCase)}
            >
              {/* <input
                    type="radio"
                    checked={criteria && criteria.hasUpperCase}
                    readOnly
                    className="mr-2"
                    style={getRadioStyle(criteria && criteria.hasUpperCase)}
                  /> */}
              <span className="mr-2 ">
                {criteria && criteria?.hasUpperCase ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </span>
              An uppercase letter (A)
            </label>
            <label
              className="mb-2 text-grey flex justify-start items-center text-sm font-Ubuntu"
              style={getLabelStyle(criteria && criteria.hasNumber)}
            >
              {/* <input
                    type="radio"
                    checked={criteria && criteria.hasNumber}
                    readOnly
                    className="mr-2"
                    style={getRadioStyle(criteria && criteria.hasNumber)}
                  /> */}
              <span className="mr-2 ">
                {criteria && criteria?.hasNumber ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </span>
              A number (0-9)
            </label>
            <label
              className="mb-2 text-grey flex justify-start items-center text-sm font-Ubuntu"
              style={getLabelStyle(criteria && criteria.hasSpecialChar)}
            >
              <span className="mr-2 ">
                {" "}
                {criteria && criteria?.hasSpecialChar ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </span>
              {/* <input
                    type="radio"
                    checked={criteria && criteria.hasSpecialChar}
                    className="mr-2"
                    style={getRadioStyle(criteria && criteria.hasSpecialChar)}
                    readOnly
                  /> */}
              A special letter (@#$%&)
            </label>
            <label
              className="mb-2 text-grey flex justify-start items-center text-sm font-Ubuntu"
              style={getLabelStyle(criteria && criteria?.hasMinLength)}
            >
              <span className="mr-2 ">
                {" "}
                {criteria && criteria?.hasMinLength ? (
                  <IoCheckmarkCircleSharp />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </span>
              {/* <input
                    type="radio"
                    checked={criteria && criteria.hasMinLength}
                    className="mr-2"
                    style={getRadioStyle(criteria && criteria?.hasMinLength)}
                    readOnly
                  /> */}
              Minimum of 8 characters
            </label>
          </div>
          <FormRow
            type="password"
            name="confirmPassword"
            value={userDetails?.confirmPassword}
            placeHolder="Re-enter your password"
            labelText="Confirm Password"
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-10"
          />
          <AuthButton isAuth="change" isActive={isActive} handleClick={handleClick} />
        </form>
        <AuthIsSignUp isAuth="change" />
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

export default ChangePassword;
