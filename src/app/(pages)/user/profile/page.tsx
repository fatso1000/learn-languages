"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import { useEffect, useState } from "react";
import AsideProfile from "../../../../components/Profile/AsideProfile";
import EditIconProfile from "../../../../components/Profile/EditIconProfile";
import { editProfileFormValidation } from "src/actions/auth";
import useCurrentUser from "src/hooks/useCurrentUser";
import { MAX_EXPERIENCE } from "src/shared/helpers";

const initialState = {
  errors: [],
  success: false,
};

export default function UserProfile(props: any) {
  const currentUser = useCurrentUser(props);

  const [state, formAction] = useFormState(
    editProfileFormValidation,
    initialState
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditIconMode, setIsEditIconMode] = useState<boolean>();

  const handleEditMode = (stateDefault?: boolean) => {
    setIsEditMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditMode
    );
  };

  const handleEditIconMode = (stateDefault?: boolean) => {
    setIsEditIconMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditIconMode
    );
  };

  useEffect(() => {
    const closeEditMode = () => {
      setIsEditMode(false);
      setIsEditIconMode(false);
    };
    closeEditMode();
  }, [props]);

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
                <h2 className="font-bold text-2xl h-full">
                  {currentUser.rank.rank.name}
                </h2>
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
