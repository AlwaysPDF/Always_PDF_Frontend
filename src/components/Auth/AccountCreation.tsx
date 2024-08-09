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
  fName: string;
  lName: string;
  password: string;
}

const AccountCreation = () => {
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
    criteria,
    setCriteria,
    userDetails,
    setUserDetails,
  } = useAppContext();

  const isUserDetailsKey = (key: string): key is keyof UserDetails => {
    return ["fName", "lName", "password"].includes(key);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newUserDetails = { ...userDetails, [name]: value || "" };
    if (setUserDetails && newUserDetails) {
      setUserDetails(newUserDetails); // Update userDetails state
    }
    console.log(newUserDetails);

    if (setIsActive) {
      const { fName = "", lName = "", password = "" } = newUserDetails;

      // Email validation regex
      // const emailIsValid = (email: string) =>
      //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // Password validation regex: at least one lowercase, one uppercase, one number, one special character, and minimum 8 characters
      const passwordIsValid = (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
          password
        );

      // Check the validation for both fields
      if (fName && lName && passwordIsValid(password)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
      console.log(isActive);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate the form values
    const errors: FormErrors = {};
    if (userDetails) {
      (["fName", "lName", "password"] as const).forEach((field) => {
        if (isUserDetailsKey(field)) {
          const value = userDetails[field]?.trim() || "";
          if (!value) {
            console.error(`Error: Empty field - ${field}`);
            errors[field] = `${
              field === "fName"
                ? "First name"
                : field === "lName"
                  ? "Last name"
                  : "password"
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
      criteria?.hasLowerCase === true &&
      criteria?.hasUpperCase === true &&
      criteria?.hasSpecialChar === true &&
      criteria?.hasNumber === true &&
      criteria?.hasMinLength === true
    ) {
      if (setLoadingActive) {
        setLoadingActive(true);
      }

      const email = Cookies.get("UserEmail");

      axiosInstance
        .patch("/user/updateUser", { ...userDetails, email })
        .then((response) => {
          if (response?.data?.success === true) {
            window.location.href = "/auth/signin";
            if (setToastMessage) {
              setToastMessage({
                text: response?.data?.msg || "Login successfuly",
                type: "success",
              });
            }
            if (setShowToast) {
              setShowToast(true);
            }
            // Redirect to home page
          } else {
            if (setToastMessage) {
              setToastMessage({
                text: response?.data?.msg || "Incorrect credentials",
                type: "error",
              });
            }
          }
        })
        .catch((err) => {
          if (setToastMessage) {
            setToastMessage({
              text: err?.response?.data?.msg || "Incorrect credentials",
              type: "error",
            });
          }
          if (setShowToast) {
            setShowToast(true);
          }
        })
        .finally(() => {
          if (setUserDetails) {
            setUserDetails({ fName: "", lName: "", password: "" });
          }

          if (setCriteria) {
            setCriteria({
              hasLowerCase: null,
              hasUpperCase: null,
              hasNumber: null,
              hasSpecialChar: null,
              hasMinLength: null,
            });
          }
          if (setLoadingActive) {
            setLoadingActive(false);
          }
        });
    }
  };

  const getLabelStyle = (isValid: any) => ({
    color: isValid === null ? "#525866" : isValid ? "#25076B" : "#DF1C41",
  });

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-xl border border-[#DEDEDE]">
      <div className="flex justify-center items-center flex-col w-[90%] py-8">
        <AuthHeader />
        <form className="w-full flex justify-center items-center mb-8 flex-col">
          <FormRow
            type="text"
            name="fName"
            value={userDetails?.fName}
            placeHolder="First name"
            labelText="First name"
            formErrors={formErrors}
            handleBlur={handleBlur}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange?.(e)
            }
            bottom="mb-4"
          />
          <FormRow
            type="text"
            name="lName"
            value={userDetails?.lName}
            placeHolder="Last name"
            labelText="Last name"
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
          <div className="mb-10 mt-2 font-Ubuntu w-full">
            <p className="text-[#121212] mb-2 font-medium font-Ubuntu text-[16px]">
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

export default AccountCreation;
