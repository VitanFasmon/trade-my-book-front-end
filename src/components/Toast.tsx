import React from "react";
import {
  toast,
  ToastContainer,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Basic toast hook with options
const useToast = () => {
  const showToast = (options: {
    text: string;
    type?: TypeOptions;
    closeButton?: boolean;
  }) => {
    toast(options.text, {
      type: options.type,
      closeButton: options.closeButton ?? true, // show close button by default
    });
  };

  return { showToast };
};

// Specific hooks for different toast types
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

// Main Toast component
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
