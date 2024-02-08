"use client";

import Image from "next/image";
import { experimental_useFormState as useFormState } from "react-dom";
import { editProfileFormValidation } from "src/actions/auth";
import { CourseIcon, FireIconSolid } from "src/components/Icons";
import { AsideProfile, EditIconProfile } from "src/components/Profile";
import useEditUser from "src/hooks/useEdit";
import useUser from "src/hooks/useUser";

import ukFlag from "public/images/flags/english_flag.png";
import spainFlag from "public/images/flags/spanish_flag.png";
import franceFlag from "public/images/flags/french_flag.png";
import italianFlag from "public/images/flags/italian_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japanese_flag.png";

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

const initialState = {
  errors: [],
  success: false,
};

export default function ProfileForm(props: any) {
  const { currentUser } = useUser(props);
  const { isEditMode, handleEditMode, isEditIconMode, handleEditIconMode } =
    useEditUser(props);
  const [state, formAction] = useFormState(
    editProfileFormValidation,
    initialState
  );

  if (!currentUser) return <div></div>;

  return (
    <form action={formAction} className="flex flex-col items-center w-full py-8">
      <AsideProfile
        currentUser={currentUser}
        handleEditIconMode={handleEditIconMode}
        handleEditMode={handleEditMode}
        isEditMode={isEditMode}
      />
      <div className="h-full w-full flex flex-col">
        {isEditMode ? (
          isEditIconMode ? (
            <EditIconProfile
              defaultNameColor={currentUser.profile.color}
              defaultAnimalName={currentUser.profile.animal_name}
            />
          ) : (
            <></>
          )
        ) : (
          <div className="w-full h-full flex flex-col gap-5 px-4 md:px-8">
            <h2 className="font-black text-3xl">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 p-3 rounded-md flex items-center flex-row gap-3">
                <div>
                  <FireIconSolid />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-none">12</span>
                  <span>Dias racha</span>
                </div>
              </div>
              <div className="border-2 p-3 rounded-md flex items-center flex-row gap-3">
                <div className="text-accent">
                  <CourseIcon />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-none">
                    {currentUser.rank.user_experience}
                  </span>
                  <span>XP</span>
                </div>
              </div>
              <div className="border-2 p-3 rounded-md flex items-center flex-row gap-3">
                <div>
                  <Image
                    width={24}
                    height={40}
                    src={currentUser.rank.rank.distintive}
                    alt={`Distintive for ${currentUser.rank.rank.distintive}`}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-none">
                    {currentUser.rank.rank.name}
                  </span>
                  <span>Division actual</span>
                </div>
              </div>
            </div>
            <h2 className="font-black text-3xl">Languages</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentUser.profile.languages.map((language, i) => (
                <div
                  className="border-2 p-3 rounded-md flex items-center flex-col gap-1"
                  key={i}
                >
                  <div>
                    <Image
                      src={languagesList[language.details.name].flagUrl.src}
                      alt="flag"
                      width={48}
                      height={28}
                      className="rounded-md"
                    />
                  </div>
                  <span className="leading-none">
                    {languagesList[language.details.name].displayName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
