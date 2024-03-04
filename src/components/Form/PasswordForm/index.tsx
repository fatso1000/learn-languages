"use client";
import { experimental_useFormState as useFormState } from "react-dom";

import { useEffect } from "react";
import PasswordInput from "src/components/InputsAndButtons/PasswordInput";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import useUser from "src/hooks/useUser";
import { userPasswordFormValidation } from "src/actions/auth";
import { useRouter } from "src/shared/navigation";

const initialState: any = {
  errors: [],
  success: false,
};

export default function PasswordForm(props: any) {
  const [state, formAction] = useFormState(userPasswordFormValidation, {
    ...initialState,
  });

  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (state.success) router.push("/");
  }, [state.success]);

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <form
        action={formAction}
        className="flex relative flex-col w-full gap-6 justify-start"
      >
        <h1 className="text-2xl font-black">Password</h1>
        <PasswordInput required label="Current password" name="old_password" />
        <PasswordInput required label="New password" name="new_password" />

        <div className="flex flex-col w-full gap-3">
          <SubmitButton className="flex-1 btn btn-success">Save</SubmitButton>
        </div>

        <input
          defaultValue={currentUser?.id || ""}
          name="user_id"
          type="text"
          className="absolute top-0 left-0 invisible h-0 w-0"
        />
      </form>
    </div>
  );
}
