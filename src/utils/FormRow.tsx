"use client";
import { useAppContext } from "@/components/ContextApi/ContextApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TiKeyboard } from "react-icons/ti";
import { HiOutlineKey } from "react-icons/hi2";

interface FormRowType {
  type: string;
  name: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  labelText?: string;
  formErrors?: any;
  password?: boolean;
  passwordHandler?: (e: any) => void;
  bottom?: string;
  //   img: string;
}

const FormRow: React.FC<FormRowType> = ({
  type,
  name,
  value,
  handleChange,
  handleBlur,
  placeHolder,
  labelText,
  formErrors,
  password,
  passwordHandler,
  bottom,
}) => {
  const { passwordActive, setPasswordActive } = useAppContext();
  const handlePassword = () => {
    if (setPasswordActive) {
      setPasswordActive(!passwordActive);
    }
  };

  // const inputType =(name === "password" || name === "confirmPassword") && passwordActive
  // ? "text"
  // : "password"  // Default to "text" for other inputs
  return (
    <>
      <div className="w-full h-full">
        <div className={`w-full h-full ${!password && "text-start"} ${bottom}`}>
          <label
            htmlFor={name}
            className={`mb-2 flex items-center  text-sm font-Helvetica text-offblack`}
            // ${
            //   formErrors[name] ? "text-errorRed" : "text-grey"
            // }
          >
            {labelText || name}
          </label>

          {!password ? (
            <div
              className={`form-input outline-none bg-transparent border ${
                formErrors[name] ? "border-errorRed" : "border-[#E2E4E9]"
              } text-[#4F4F4F] text-sm rounded-lg flex justify-between items-center w-full font-medium px-2 focus:border focus:border-black `}
            >
              {name === "email" ? (
                <MdOutlineEmail />
              ) : name === "lName" ? (
                <FaRegUser />
              ) : name === "fName" ? (
                <FaRegUser />
              ) : (
                <TiKeyboard />
              )}
              <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeHolder}
                min={name === "number" ? "4" : undefined}
                max={name === "number" ? "4" : undefined}
                className={`bg-transparent h-full w-full font-Helvetica focus:outline-none focus:bg-transparent active:bg-transparent py-3`}
              />
            </div>
          ) : (
            <div
              className={`form-input outline-none bg-transparent border ${
                formErrors[name] ? "border-errorRed" : "border-[#E2E4E9]"
              } text-[#4F4F4F] text-sm rounded-lg flex justify-between items-center w-full h-10 font-semibold px-2`}
            >
              <HiOutlineKey />
              <input
                type={passwordActive ? "text" : "password"}
                value={value}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeHolder}
                className={`bg-transparent h-full w-full font-Helvetica font-medium focus:outline-none focus:bg-transparent active:bg-transparent`}
              />
              {passwordActive ? (
                <p onClick={() => handlePassword()}>
                  <FiEyeOff />
                </p>
              ) : (
                <p onClick={() => handlePassword()}>
                  <FiEye />
                </p>
              )}
            </div>
          )}
          {formErrors[name] && (
            <span className="text-errorRed mt-3 text-sm text-start w-full">
              {formErrors[name]}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default FormRow;
