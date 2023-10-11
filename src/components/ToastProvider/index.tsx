"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function ToastProvider({ children }: any) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
