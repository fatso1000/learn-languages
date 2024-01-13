"use client";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";
import { signInFormValidation } from "src/actions/auth";
import PasswordInput from "src/components/InputsAndButtons/PasswordInput";
import FormInput from "src/components/InputsAndButtons/FormInput";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const initialState = {
  errors: [],
  success: false,
};

export default function SignInForm() {
  const [state, formAction] = useFormState(signInFormValidation, initialState);

  useEffect(() => {
    if (state.success) redirect("/dashboard");
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col items-center gap-y-5">
      {state.errors && state.errors.length > 0 && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              Errors list
            </h2>
            <div className="flex flex-col gap-y-1">
              {state.errors.map((error: { message: string }) => (
                <span key={error.message}>
                  <div className="badge badge-error badge-xs mr-2"></div>
                  {error.message}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <FormInput
        label="Email"
        type="email"
        required
        placeholder="Email"
        name="email"
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        name="password"
        required
      />
      <SubmitButton className="btn btn-primary">Sign In</SubmitButton>
    </form>
  );
}
