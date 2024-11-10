import React from "react";
import { toast, ToastContainer, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const showToast = (options: {
    text: string;
    type?: TypeOptions;
    closeButton?: boolean;
  }) => {
    toast(options.text, {
      type: options.type,
      closeButton: options.closeButton ?? true,
    });
  };

  return { showToast };
};

const useSuccessToast = () => {
  const showSuccessToast = (message: string) => toast.success(message);
  return { showSuccessToast };
};

const useErrorToast = () => {
  const showErrorToast = (message: string) => toast.error(message);
  return { showErrorToast };
};

const useWarningToast = () => {
  const showWarningToast = (message: string) => toast.warn(message);
  return { showWarningToast };
};

const useInfoToast = () => {
  const showInfoToast = (message: string) => toast.info(message);
  return { showInfoToast };
};

const useDarkToast = () => {
  const showDarkToast = (message: string) =>
    toast(message, {
      className: "toast-dark",
      bodyClassName: "toast-dark-body",
    });
  return { showDarkToast };
};

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export {
  Toast,
  useToast,
  useSuccessToast,
  useErrorToast,
  useWarningToast,
  useInfoToast,
  useDarkToast,
};
