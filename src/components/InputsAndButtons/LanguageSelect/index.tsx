"use client";
import Image from "next/image";

import { useEffect, useRef, useActionState } from "react";
import { Link, useRouter } from "src/shared/navigation";
import { selectUserLanguageFormValidation } from "src/actions/auth";
import { LanguageSelectProps } from "src/types";
import Modal from "src/components/Modal";
import languagesList from "src/shared/languagesList";

const initialState: any = {
  errors: [],
  success: false,
};

export default function LanguageSelect(props: LanguageSelectProps) {
  const { selectedLanguage, languages, generics } = props;
  const router = useRouter();
  const [state, formAction] = useActionState(selectUserLanguageFormValidation, {
    ...initialState,
    user_profile_id: selectedLanguage.user_profile_id,
  });
  const formRef = useRef<any>(null),
    modalRef = useRef<any>(null);

  useEffect(() => {
    if (state.success) router.push("/");
  }, [state.success]);

  const onOpenModal = () => modalRef.current && modalRef.current.showModal();

  return (
    <>
      <button className="btn max-md:btn-sm btn-ghost" onClick={onOpenModal}>
        {selectedLanguage && (
          <Image
            src={
              languagesList[selectedLanguage.details.target_language.name]
                .flagUrl.src
            }
            alt=""
            width={48}
            height={28}
            className="w-10 my-auto rounded-md"
          />
        )}
      </button>
      <Modal id="languagesModal" modalRef={modalRef} title={generics.title}>
        <form
          action={formAction}
          ref={formRef}
          className="grid grid-cols-4 gap-2 justify-center items-center"
        >
          {languages &&
            languages.map((language) => (
              <label
                className={`w-full cursor-pointer flex flex-col items-center justify-center hover:bg-base-200 rounded p-2 ${
                  language.active ? "order-first border-2" : ""
                }`}
                key={language.id}
              >
                <input
                  type="radio"
                  name="language"
                  value={[
                    language.details.base_language.name,
                    language.details.target_language.name,
                  ]}
                  onClick={() => formRef.current.requestSubmit()}
                  disabled={language.active}
                  defaultChecked={language.active}
                  className="invisible h-0 w-0 radio-input"
                />
                <div className="cursor-pointer rounded relative">
                  <Image
                    src={
                      languagesList[language.details.target_language.name]
                        .flagUrl.src
                    }
                    alt="flag"
                    width={48}
                    height={28}
                    className="rounded"
                  />
                  {language.details.base_language_id !==
                    selectedLanguage.details.base_language_id && (
                    <Image
                      src={
                        languagesList[language.details.base_language.name]
                          .flagUrl.src
                      }
                      alt="flag"
                      width={63}
                      height={24}
                      className="m-auto h-4 w-6 rounded-md absolute top-0 right-0 shadow"
                    />
                  )}
                </div>
                <span
                  className={`text-[0.7rem] first-letter:uppercase ${
                    language.active ? "font-extrabold" : ""
                  }`}
                >
                  {language.details.target_language.name}
                </span>
              </label>
            ))}
          <label className="order-last col-span-4">
            <Link href="/languages" className="btn w-full">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>{generics.button}</span>
            </Link>
          </label>
        </form>
      </Modal>
    </>
  );
}
