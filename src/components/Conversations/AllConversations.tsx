"use client";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";
import { useEffect, useState } from "react";
import { useAppContext } from "../ContextApi/ContextApi";
import { BounceLoader } from "react-spinners";

interface Token {
  token?: string;
}

const AllConversations: React.FC<Token> = ({ token }) => {
  const {
    loadingActive,
    setLoadingActive,
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    pdfUrl,
    setPdfUrl,
  } = useAppContext();
  const [pdfText, setPdfText] = useState<string>("");
  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        if (setLoadingActive) {
          setLoadingActive(true);
        }

        axiosInstanceWithHeader
          .post(`/questions/upload/${token}`, { pdfUrl })
          .then((response) => {
            if (response?.data?.success === true) {
              setPdfText(response?.data?.pdfText);
              if (setToastMessage) {
                setToastMessage({
                  text:
                    response?.data?.msg ||
                    "A confirmation code has been sent to your email address.",
                  type: "success",
                });
              }
              if (setShowToast) {
                setShowToast(true);
              }
              // Redirect to home page
              //   window.location.href = "/auth/signin";
            }
          })
          .catch((err) => {
            if (setToastMessage) {
              setToastMessage({
                text:
                  err?.response?.data?.errors?.[0]?.message ||
                  "We are unable to find a user for this token. Token may have expired",
                type: "error",
              });
            }
            if (setShowToast) {
              setShowToast(true);
            }
            // window.location.href = "/verify-email";
          })
          .finally(() => {
            if (setLoadingActive) {
              setLoadingActive(false);
            }
          });
      }
    };

    verifyEmail();
  }, [token]);
  return (
    <section className="flex justify-center items-center w-full">
      {loadingActive ? (
        <BounceLoader color="#25076B" size={120} />
      ) : (
        <div className="grid grid-cols-2 gap-20 w-full">
          <aside className="w-full bg-white rounded-xl flex justify-center items-center">
            <div>{pdfText}</div>
          </aside>
          <aside className=" h-[80vh] flex justify-center items-start flex-col"></aside>
        </div>
      )}
    </section>
  );
};

export default AllConversations;
