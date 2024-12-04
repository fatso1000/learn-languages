"use client";

import { useEffect, useRef, useActionState } from "react";
import {
  deleteUserFormValidation,
  userAccountFormValidation,
} from "src/actions/auth";
import useUser from "src/hooks/useUser";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import FormInput from "src/components/InputsAndButtons/FormInput";
import { useRouter } from "src/shared/navigation";
import Modal from "src/components/Modal";

const initialState: any = {
  errors: [],
  success: false,
};

export default function SettingsForm(props: any) {
  const [state, formAction] = useActionState(userAccountFormValidation, {
    ...initialState,
  });
  const [stateDelete, formActionDelete] = useActionState(
    deleteUserFormValidation,
    {
      ...initialState,
    }
  );

  const { currentUser } = useUser();
  const router = useRouter();

  const modalRef = useRef<any>(null);

  const formRef = useRef<any>(null);

  const onOpenModal = () => modalRef.current && modalRef.current.showModal();
  const onCloseModal = () => modalRef.current && modalRef.current.close();

  useEffect(() => {
    if (state.success) router.push("/");
  }, [state.success, stateDelete.success]);

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <form
        action={formAction}
        className="flex relative flex-col w-full gap-6 justify-start"
      >
        <h1 className="text-2xl font-black">Account</h1>
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
        ref={formRef}
        action={formActionDelete}
        className="flex flex-col w-full gap-6 justify-center items-center"
      >
        <input
          defaultValue={currentUser?.id || ""}
          name="user_id"
          type="text"
          className="absolute top-0 right-0 invisible h-0 w-0"
        />
        <button
          className="btn w-full btn-outline btn-error"
          type="button"
          onClick={onOpenModal}
        >
          Delete account
        </button>
      </form>
      <Modal id="languagesModal" modalRef={modalRef} title={"Estás seguro?"}>
        <div className="flex w-full gap-3">
          <button
            className="flex-1 btn btn-outline btn-error"
            onClick={() => {
              formRef.current.requestSubmit();
              onCloseModal();
              router.push("/");
            }}
          >
            Confirm
          </button>
          <button className="flex-1 btn" type="button" onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
