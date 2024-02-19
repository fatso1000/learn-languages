"use client";
import Image from "next/image";

import ukFlag from "public/images/flags/english_flag.png";
import spainFlag from "public/images/flags/spanish_flag.png";
import franceFlag from "public/images/flags/french_flag.png";
import italianFlag from "public/images/flags/italian_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japanese_flag.png";

import { useRouter } from "next/navigation";
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { selectUserLanguageFormValidation } from "src/actions/auth";
import { LanguageSelectProps } from "src/types";
import Modal from "src/components/Modal";

const languagesList: any = {
  english: {
    flagUrl: ukFlag,
    displayName: "English",
  },
  spanish: {
    flagUrl: spainFlag,
    displayName: "Spanish",
  },
  german: { flagUrl: germanFlag, displayName: "German" },
  italian: { flagUrl: italianFlag, displayName: "Italian" },
  japanese: { flagUrl: japaneseFlag, displayName: "Japanese" },
  french: { flagUrl: franceFlag, displayName: "French" },
};

const initialState: any = {
  errors: [],
  success: false,
};

export default function LanguageSelect(props: LanguageSelectProps) {
  const { selectedLanguage, languages } = props;
  const router = useRouter();
  const [state, formAction] = useFormState(selectUserLanguageFormValidation, {
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
            src={languagesList[selectedLanguage.details.name].flagUrl.src}
            alt=""
            width={48}
            height={28}
            className="w-10 my-auto rounded-md"
          />
        )}
      </button>
      <Modal modalRef={modalRef} title="Select Language">
        <form
          action={formAction}
          ref={formRef}
          className="grid grid-cols-4 gap-2 justify-center items-center"
        >
          {languages &&
            languages.map((language) => {
              return (
                <label
                  className={`w-full cursor-pointer flex flex-col items-center justify-center hover:bg-base-200 rounded p-2 ${
                    language.id === selectedLanguage.id ? "order-first" : ""
                  }`}
                  key={language.id}
                >
                  <input
                    type="radio"
                    name="language_id"
                    value={language.id}
                    onClick={() => formRef.current.requestSubmit()}
                    disabled={language.id === selectedLanguage.id}
                    defaultChecked={language.id === selectedLanguage.id}
                    className="invisible h-0 w-0 radio-input"
                  />
                  <div className="cursor-pointer rounded">
                    <Image
                      src={languagesList[language.details.name].flagUrl.src}
                      alt="flag"
                      width={48}
                      height={28}
                      className="rounded"
                    />
                  </div>
                  <span
                    className={`text-[0.7rem] first-letter:uppercase ${
                      language.id === selectedLanguage.id
                        ? "font-extrabold"
                        : ""
                    }`}
                  >
                    {language.details.name}
                  </span>
                </label>
              );
            })}
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
              <span>New Language!</span>
            </Link>
          </label>
        </form>
      </Modal>
    </>
  );
}
