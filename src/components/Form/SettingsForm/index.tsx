"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect } from "react";

import {
  deleteUserFormValidation,
  userAccountFormValidation,
} from "src/actions/auth";
import useUser from "src/hooks/useUser";

import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import FormInput from "src/components/InputsAndButtons/FormInput";
import { useRouter } from "src/shared/navigation";

const initialState: any = {
  errors: [],
  success: false,
};

export default function SettingsForm(props: any) {
  const [state, formAction] = useFormState(userAccountFormValidation, {
    ...initialState,
  });
  const [stateDelete, formActionDelete] = useFormState(
    deleteUserFormValidation,
    {
      ...initialState,
    }
  );

  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (state.success) router.refresh();
  }, [state.success, stateDelete.success]);

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <form
        action={formAction}
        className="flex relative flex-col w-full gap-6 justify-start"
      >
        <h1 className="text-2xl font-black">Account</h1>
        <FormInput
          required
          label="Email"
          defaultValue={currentUser?.email}
          name="email"
        />

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
      <div className="divider"></div>
      <form
        action={formActionDelete}
        className="flex flex-col w-full gap-6 justify-center items-center"
      >
        <input
          defaultValue={currentUser?.id || ""}
          name="user_id"
          type="text"
          className="absolute top-0 right-0 invisible h-0 w-0"
        />
        <SubmitButton className="btn w-full btn-outline btn-error">
          Delete account
        </SubmitButton>
      </form>
    </div>
  );
}
