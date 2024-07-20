"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { userDeleteLanguage } from "src/actions/auth";
import useUser from "src/hooks/useUser";
import languagesList from "src/shared/languagesList";
import { useRouter } from "src/shared/navigation";
import { SelectedLanguageElement } from "src/types";

export default function CoursesForm(props: any) {
  const [languages, setLanguages] = useState<SelectedLanguageElement[]>([]);
  const { currentUser, selectedLanguage, isLoggedIn } = useUser();
  const router = useRouter();

  const onDelete = async (courseId: number, languageComboId: number) => {
    await userDeleteLanguage(courseId, languageComboId, currentUser!.id);
    router.push("/");
  };

  useEffect(() => {
    setLanguages(currentUser?.profile.languages || []);
  }, [currentUser, selectedLanguage, isLoggedIn]);

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div className="flex relative flex-col w-full gap-6 justify-start">
        <h1 className="text-2xl font-black">Courses</h1>
        <div className="flex flex-col p-2 gap-2 w-full">
          {languages.length > 0 &&
            languages.map((language) => (
              <div
                key={language.id}
                className="inline-flex justify-between items-center"
              >
                <div className="inline-flex gap-2 items-center">
                  <Image
                    src={
                      languagesList[language.details.target_language.name]
                        .flagUrl.src
                    }
                    alt="flag"
                    width={48}
                    height={28}
                    className="rounded-md"
                  />
                  <span className="font-bold">
                    {language.details.target_language.name}
                  </span>
                </div>
                <button
                  disabled={language.id === selectedLanguage?.id}
                  onClick={() => onDelete(language.id, language.details.id)}
                  className="btn btn-link"
                >
                  Eliminar
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
