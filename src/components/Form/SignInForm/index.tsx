"use client";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";
import { signInFormValidation } from "src/actions/auth";
import PasswordInput from "src/components/InputsAndButtons/PasswordInput";
import FormInput from "src/components/InputsAndButtons/FormInput";
import { useEffect } from "react";
import { useRouter } from "src/shared/navigation";
import { useTranslations } from "next-intl";

const initialState = {
  errors: [],
  success: false,
};

export default function SignInForm() {
  const generics = useTranslations("generics");
  const t = useTranslations("pages.signIn");
  const [state, formAction] = useFormState(signInFormValidation, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.success) router.push("/");
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col items-center gap-y-5">
      {state.errors && state.errors.length > 0 && (
        <div className="card w-full bg-base-100 border">
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
      <FormInput label={t("email")} type="email" required name="email" />
      <PasswordInput
        label={t("password")}
        placeholder=""
        name="password"
        required
      />
      <SubmitButton className="btn btn-success w-full">
        {generics("signIn")}
      </SubmitButton>
    </form>
  );
}
