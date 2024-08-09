"use client";

import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { DocumentData } from "@/utils/Types";
// import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  // Dispatch,
  useState,
  useEffect,
} from "react";

interface ToastMessage {
  text: string;
  type: "info" | "success" | "warning" | "error";
}

interface UserDetails {
  fName?: string;
  lName?: string;
  password?: string;
}

interface CriteriaInter {
  hasLowerCase: boolean | null;
  hasUpperCase: boolean | null;
  hasNumber: boolean | null;
  hasSpecialChar: boolean | null;
  hasMinLength: boolean | null;
}

interface FormErrors {
  [key: string]: string;
}

interface TouchedErrors {
  [key: string]: boolean;
}

interface ResetDetails {
  password: string;
  confirmPassword: string;
}

// type Action =
//   | { type: "SET_SHOW_TOAST"; payload: boolean }
//   | { type: "SET_TOAST_MESSAGE"; payload: ToastMessage };

interface MyContextType {
  showToast?: boolean;
  setShowToast?: (value: boolean) => void;
  toastMessage: ToastMessage;
  setToastMessage?: (value: ToastMessage) => void;
  userDetails?: UserDetails;
  setUserDetails?: (value: UserDetails) => void;
  formErrors?: FormErrors;
  setFormErrors?: (value: FormErrors) => void;
  touched?: TouchedErrors;
  setTouched?: (value: TouchedErrors) => void;
  passwordActive?: boolean;
  setPasswordActive?: (value: boolean) => void;
  validateEmail?: (value: string) => any;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetPassword?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleToastClose?: () => any;
  loadingActive?: boolean;
  setLoadingActive?: (value: boolean) => void;
  isActive?: boolean;
  setIsActive?: (value: boolean) => void;
  resetPasswords?: ResetDetails;
  setResetPasswords?: (value: ResetDetails) => void;
  criteria?: CriteriaInter;
  setCriteria?: (value: CriteriaInter) => void;
  showSidebar?: boolean;
  setShowSidebar?: (value: boolean) => void;
  settingsNav?: string;
  setSettingsNav?: (value: string) => void;
  isModalOpen?: boolean;
  setIsModalOpen?: (value: boolean) => void;
  documents?: DocumentData[];
  pdfUrl?: string;
  setPdfUrl?: (value: string) => void;
  // dispatch: Dispatch<Action>;
}

const initialState: MyContextType = {
  showToast: false,
  setShowToast: () => {},
  toastMessage: { text: "", type: "info" },
  setToastMessage: () => {},
  userDetails: { fName: "", lName: "", password: "" },
  setUserDetails: () => {},
  formErrors: {},
  setFormErrors: () => {},
  touched: {},
  setTouched: () => {},
  passwordActive: false,
  setPasswordActive: () => {},
  validateEmail: () => {},
  handleChange: () => {},
  handleResetPassword: () => {},
  handleBlur: () => {},
  handleToastClose: () => {},
  loadingActive: false,
  setLoadingActive: () => {},
  isActive: false,
  setIsActive: () => {},
  resetPasswords: { password: "", confirmPassword: "" },
  setResetPasswords: () => {},
  criteria: {
    hasLowerCase: null,
    hasUpperCase: null,
    hasNumber: null,
    hasSpecialChar: null,
    hasMinLength: null,
  },
  setCriteria: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  settingsNav: "Basic Information",
  setSettingsNav: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  documents: [] as DocumentData[],
  pdfUrl: "",
  setPdfUrl: () => {},
  // dispatch: () => {},
};

const ContextApi = createContext<MyContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

// const reducer = (state: MyContextType, action: Action): MyContextType => {
//   switch (action.type) {
//     case "SET_SHOW_TOAST":
//       return {
//         ...state,
//         showToast: action.payload,
//       };
//     case "SET_TOAST_MESSAGE":
//       return {
//         ...state,
//         toastMessage: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const ContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const router = useRouter();
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state] = useReducer((state) => state, initialState);
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [touched, setTouched] = useState<TouchedErrors>({});
  const [passwordActive, setPasswordActive] = useState<boolean>(false);
  const [loadingActive, setLoadingActive] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage>({
    text: "",
    type: "info",
  });

  const [userDetails, setUserDetails] = useState<UserDetails>({
    fName: "",
    lName: "",
    password: "",
  });

  const [pdfUrl, setPdfUrl] = useState("");

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const [criteria, setCriteria] = useState<CriteriaInter>({
    hasLowerCase: null,
    hasUpperCase: null,
    hasNumber: null,
    hasSpecialChar: null,
    hasMinLength: null,
  });

  const [resetPasswords, setResetPasswords] = useState<ResetDetails>({
    password: "",
    confirmPassword: "",
  });

  const [settingsNav, setSettingsNav] = useState<string>("Basic Information");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // the usestate to store errors for the auth forms
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // the onchange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setincorrectpass(false);
    if (userDetails) {
      setUserDetails?.({ ...userDetails, [name]: value }); // Type assertion (optional)
    }
  };

  const isPassword = userDetails.password === "";

  useEffect(() => {
    if (isPassword) {
      return;
    }
    if (userDetails.password) {
      setCriteria({
        hasLowerCase: /[a-z]/.test(userDetails.password),
        hasUpperCase: /[A-Z]/.test(userDetails.password),
        hasNumber: /[0-9]/.test(userDetails.password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(userDetails.password),
        hasMinLength: userDetails.password.length >= 8,
      });
    } else {
      setCriteria({
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails.password]);

  // the onchange function
  const handleResetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setincorrectpass(false);
    if (resetPasswords) {
      setResetPasswords?.({ ...resetPasswords, [name]: value }); // Type assertion (optional)
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (touched && setTouched) {
      setTouched({ ...touched, [name]: true });
    }

    const errors: FormErrors = { ...formErrors };
    if (!value) {
      errors[name] = `${
        name === "lName"
          ? "Last name"
          : name === "fName"
            ? "First name"
            : name === "verificationToken"
              ? "OTP"
              : name === "email"
                ? "Email address"
                : "Password"
        // name.charAt(0).toUpperCase() + name.slice(1)
      } is required.`;
      // if (userDetails?.email && !validateEmail(userDetails.email)) {
      //   errors.email = "Invalid email address";
      // }
    } else {
      delete errors[name];
    }

    setFormErrors?.(errors);
  };

  const handleToastClose = () => {
    if (setShowToast) {
      setShowToast(false);
    }
  };

  const fetchAllDocuments = async () => {
    try {
      // Make a GET request to your backend endpoint
      const response = await axiosInstanceWithHeader.get(
        "/documentUpload/allDocuments"
      );

      // Extract data from the response
      const documents = response.data;

      // Handle the documents data
      console.log("Fetched documents:", documents);
      return documents.documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error; // Optionally, rethrow the error to handle it in the calling code
    }
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const docs = await fetchAllDocuments();
        setDocuments(docs);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    };

    getDocuments();
  }, []);

  // const handleCurrentUser = async () => {
  //   try {
  //     const response = await axiosInstanceWithHeader.get("/users/current-user");
  //     const data = await response.data;
  //     console.log(data);

  //     if (data.status === "success") {
  //       setCurrentUser(data.data);
  //       console.log(currentUser);
  //     }

  //     // return data;
  //   } catch {
  //     console.log("Error fetching data");
  //   }
  // };

  // useEffect(() => {
  //   handleCurrentUser(); // Call once on component mount
  // }, [router]);

  const contextValue: MyContextType = {
    ...state,
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    userDetails,
    setUserDetails,
    formErrors,
    setFormErrors,
    touched,
    setTouched,
    passwordActive,
    setPasswordActive,
    validateEmail,
    handleChange,
    handleResetPassword,
    handleBlur,
    handleToastClose,
    loadingActive,
    setLoadingActive,
    isActive,
    setIsActive,
    resetPasswords,
    setResetPasswords,
    criteria,
    setCriteria,
    showSidebar,
    setShowSidebar,
    settingsNav,
    setSettingsNav,
    isModalOpen,
    setIsModalOpen,
    documents,
  };

  return (
    <ContextApi.Provider value={contextValue}>{children}</ContextApi.Provider>
  );
};

const useAppContext = (): MyContextType => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};

export { ContextProvider, useAppContext };
