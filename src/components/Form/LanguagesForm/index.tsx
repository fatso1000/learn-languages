"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect } from "react";
import { selectUserLanguageFormValidation } from "src/actions/auth";
import LanguageInput from "src/components/InputsAndButtons/LanguageInput";
import useUser from "src/hooks/useUser";
import { useLocale } from "next-intl";
import SubmitButton from "src/components/InputsAndButtons/SubmitButton";
import { useRouter } from "src/shared/navigation";

const initialState: any = {
  errors: [],
  success: false,
};

export default function LanguagesForm() {
  const [state, formAction] = useFormState(selectUserLanguageFormValidation, {
    ...initialState,
  });

  const { selectedLanguage } = useUser();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (state.success) router.push("/languages");
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col w-full gap-6 justify-center items-center"
    >
      <LanguageInput defaultLanguage={locale} />
      <SubmitButton className="w-full btn btn-success mt-4">
        Start new course
      </SubmitButton>
      <input
        value={(selectedLanguage && selectedLanguage.user_profile_id) || ""}
        name="user_profile_id"
        type="text"
        className="invisible h-0 w-0"
      />
    </form>
  );
}
