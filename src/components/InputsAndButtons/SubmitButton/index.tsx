"use client";

import { ReactNode } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: ReactNode;
  className: string;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`${props.className} ${pending ? "btn-disabled" : ""}`}
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        props.children
      )}
    </button>
  );
}
