"use client";
import { useActionState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { editProfileFormValidation } from "src/actions/auth";
import {
  ClockIcon,
  CourseIcon,
  EditIcon,
  FireIconSolid,
} from "src/components/Icons";
import {
  AsideProfile,
  EditIconProfile,
  EditProfile,
} from "src/components/Profile";
import useEditUser from "src/hooks/useEdit";
import useUser from "src/hooks/useUser";
import languagesList from "src/shared/languagesList";

const initialState = {
  errors: [],
  success: false,
};

export default function ProfileForm(props: { props: unknown }) {
  const t = useTranslations("pages.profile");
  const generics = useTranslations("generics");

  const format = useFormatter();
  const { currentUser, strikes } = useUser(props);
  const { isEditMode, handleEditMode, isEditIconMode, handleEditIconMode } =
    useEditUser(props);
  const [state, formAction] = useActionState(
    editProfileFormValidation,
    initialState
  );

  if (!currentUser) return <div></div>;

  return (
    <form
      action={formAction}
      className={`flex flex-col items-center w-full bg-${currentUser.profile.color}`}
    >
      <AsideProfile
        currentUser={currentUser}
        handleEditIconMode={handleEditIconMode}
        handleEditMode={handleEditMode}
        isEditMode={isEditMode}
      />
      <div className="h-full w-full flex flex-col pt-4 rounded-t-3xl bg-base-100">
        {isEditMode ? (
          <div className="w-full flex flex-col gap-5 px-4 md:px-8">
            <EditProfile
              user={currentUser}
              handleEditIconMode={handleEditIconMode}
              handleEditMode={handleEditMode}
            />
            {isEditIconMode ? (
              <EditIconProfile
                defaultNameColor={currentUser.profile.color}
                defaultAnimalName={currentUser.profile.animal_name}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-5 px-4 md:px-8">
            <div className="relative">
              <h2 className="text-3xl font-black">{currentUser.name}</h2>
              <span className="leading-none">{currentUser.email}</span>
              <span className="mt-3 inline-flex w-full gap-2 text-neutral-400 items-center">
                <ClockIcon />
                <span className="text-neutral-400">
                  {t("accountCreatedOn")}{" "}
                  {format.dateTime(new Date(currentUser.created_at), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
              {currentUser.ubication && (
                <span className="mt-3 inline-flex w-full gap-2 text-neutral-400 items-center">
                  <ClockIcon />
                  <span className="text-neutral-400">
                    {currentUser.ubication}
                  </span>
                </span>
              )}
              {currentUser.biography && (
                <span className="mt-3 inline-flex w-full gap-2 text-neutral-400 items-center">
                  <ClockIcon />
                  <span className="text-neutral-400">
                    {currentUser.biography}
                  </span>
                </span>
              )}
              <button
                className="btn btn-ghost font-black absolute top-0 right-0"
                onClick={() => handleEditMode()}
              >
                <EditIcon className="w-8 h-8" />
              </button>
            </div>
            <div className="divider"></div>
            <h2 className="font-black text-3xl">{t("statistics.title")}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 p-3 rounded-md flex items-center flex-row gap-3">
                <div className="text-error">
                  <FireIconSolid />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl leading-none">
                    {strikes?.strikes_length || 0}
                  </span>
                  <span>{t("statistics.streaks")}</span>
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
                    {generics(`ranks.${currentUser.rank.rank.name}`)}
                  </span>
                  <span>{t("statistics.rank")}</span>
                </div>
              </div>
            </div>
            <h2 className="font-black text-3xl">{t("languages")}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentUser.profile.languages.map((language, i) => (
                <div
                  className="border-2 p-3 rounded-md flex items-center flex-col gap-1"
                  key={i}
                >
                  <div>
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
                  </div>
                  <span className="leading-none">
                    {generics(
                      `languages.${languagesList[
                        language.details.target_language.name
                      ].displayName.toLowerCase()}`
                    )}
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
