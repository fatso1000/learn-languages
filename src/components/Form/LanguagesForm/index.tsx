"use client";
import ukFlag from "public/images/flags/english_flag.png";
import spainFlag from "public/images/flags/spanish_flag.png";
import franceFlag from "public/images/flags/french_flag.png";
import italianFlag from "public/images/flags/italian_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japanese_flag.png";

import { experimental_useFormState as useFormState } from "react-dom";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getSelectedLanguage } from "src/shared/cookies";
import { selectUserLanguageFormValidation } from "src/actions/auth";
import Image from "next/image";
import { SelectedLanguageElement } from "src/types";

const languagesList = [
  {
    id: "english",
    flagUrl: ukFlag,
    displayName: "English",
    key: 1,
  },
  { id: "spanish", flagUrl: spainFlag, displayName: "Spanish", key: 2 },
  { id: "german", flagUrl: germanFlag, displayName: "German", key: 3 },
  { id: "italian", flagUrl: italianFlag, displayName: "Italian", key: 4 },
  { id: "japanese", flagUrl: japaneseFlag, displayName: "Japanese", key: 5 },
  { id: "french", flagUrl: franceFlag, displayName: "French", key: 6 },
];

const initialState: any = {
  errors: [],
  success: false,
};

export default function LanguagesForm() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SelectedLanguageElement>();
  const [state, formAction] = useFormState(selectUserLanguageFormValidation, {
    ...initialState,
  });
  const [languages, setLanguages] = useState<SelectedLanguageElement[]>([]);
  const formRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.success) router.push("/");
  }, [state.success]);

  const checkUserLoggedIn = async () => {
    const user = await getCurrentUser();
    const selectedLanguageStr = await getSelectedLanguage();
    if (user) {
      setLanguages(JSON.parse(user.value).profile.languages);
      setSelectedLanguage(JSON.parse(selectedLanguageStr!.value));
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <form
      action={formAction}
      ref={formRef}
      className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center"
    >
      {languagesList.map((language) => {
        const languagex = selectedLanguage
          ? selectedLanguage.details.name
          : languages.find((lng) => lng.details.name === language.id)?.details
              .name || "";
        return (
          <label
            className={`w-full cursor-pointer flex flex-col items-center justify-center hover:bg-base-200 rounded p-2 ${
              language.id === languagex
                ? "order-first border border-base-300"
                : ""
            }`}
            key={language.id}
          >
            <input
              type="radio"
              name="language_id"
              value={language.key}
              onClick={() => formRef.current.requestSubmit()}
              disabled={language.id === languagex}
              defaultChecked={language.id === languagex}
              className="invisible h-0 w-0 radio-input"
            />
            <div className="cursor-pointer rounded">
              <Image
                src={language.flagUrl.src}
                alt={"flag"}
                width={120}
                height={80}
                className="rounded w-full h-20"
              />
            </div>
            <span
              className={`text-base first-letter:uppercase ${
                language.id === languagex ? "font-extrabold" : ""
              }`}
            >
              {language.displayName}
            </span>
          </label>
        );
      })}
      <input
        value={(selectedLanguage && selectedLanguage.user_profile_id) || ""}
        name="user_profile_id"
        type="text"
        className="invisible h-0 w-0"
      />
    </form>
  );
}
