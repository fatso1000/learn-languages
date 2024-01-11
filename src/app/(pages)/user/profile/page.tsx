"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import AsideProfile from "../../../../components/Profile/Aside";
import EditIconProfile from "../../../../components/Profile/EditIcon";
import { editProfileFormValidation } from "src/actions/auth";
import { MAX_EXPERIENCE } from "src/shared/helpers";
import Image from "next/image";
import useUser from "src/hooks/useUser";
import useEditUser from "src/hooks/useEdit";

const initialState = {
  errors: [],
  success: false,
};

export default function UserProfile(props: any) {
  const { currentUser } = useUser(props);
  const { isEditMode, handleEditMode, isEditIconMode, handleEditIconMode } =
    useEditUser(props);

  const [state, formAction] = useFormState(
    editProfileFormValidation,
    initialState
  );

  if (currentUser && currentUser.profile)
    return (
      <div className="flex w-full h-full items-center justify-center my-5">
        <form
          action={formAction}
          className="flex bg-base-200 rounded-[1em] items-center w-[75vw] h-[70vh] border-4 border-base-300"
        >
          <AsideProfile
            currentUser={currentUser}
            handleEditIconMode={handleEditIconMode}
            handleEditMode={handleEditMode}
            isEditMode={isEditMode}
          />
          <div className="h-full w-full p-[3em] flex justify-start items-start">
            {isEditIconMode ? (
              <EditIconProfile
                defaultNameColor={currentUser.profile.color}
                defaultAnimalName={currentUser.profile.animal_name}
              />
            ) : (
              <div className="w-full flex items-center gap-5 justify-center">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    width={30}
                    height={50}
                    src={currentUser.rank.rank.distintive}
                    alt={`Distintive for ${currentUser.rank.rank.distintive}`}
                  />
                  <h2 className="font-bold text-2xl h-full">
                    {currentUser.rank.rank.name}
                  </h2>
                </div>
                <span className="flex flex-col items-center w-full mb-4">
                  {currentUser.rank.user_experience}/{MAX_EXPERIENCE}
                  <progress
                    className="progress progress-info"
                    value={`${currentUser.rank.user_experience}`}
                    max={`${MAX_EXPERIENCE}`}
                  ></progress>
                </span>
                <h2 className="font-bold w-36 text-2xl">Next rank</h2>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  return <div className="w-[10em] h-[10em]">User not found</div>;
}
