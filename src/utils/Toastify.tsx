import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastifyProps {
  text: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
}

const Toastify: React.FC<ToastifyProps> = ({
  text,
  type,
  duration = 3000,
  onClose,
}) => {
  const showToast = () => {
    toast[type](text, {
      //   autoClose: duration,
      className: type,
      autoClose: duration,
      closeOnClick: true,
      style: {
        background: "white",
      },
      onClose: onClose,
      position: "top-right",
    });
  };

  useEffect(() => {
    showToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ToastContainer />;
};

export default Toastify;
