"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";
import AsideProfile from "../../../../components/Profile/AsideProfile";
import EditIconProfile from "../../../../components/Profile/EditIconProfile";
import { submitForm } from "../../../../shared/submitForm";
import { useEditMode } from "src/hooks/useEditMenu";

export default function UserProfile(props: any) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const { isEditIconMode } = useEditMode(props);

  const submit = submitForm.bind(null, currentUser?.id);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUser();
  }, [props]);

  if (currentUser && currentUser.profile)
    return (
      <div className="flex w-full h-full items-center justify-center my-5">
        <form
          action={submit}
          className="flex bg-base-200 rounded-[1em] items-center w-[75vw] h-[70vh] border-4 border-base-300"
        >
          <AsideProfile currentUser={currentUser} />
          <div className="h-full w-full p-[3em] flex">
            {isEditIconMode ? (
              <EditIconProfile
                defaultNameColor={currentUser.profile.color}
                defaultAnimalName={currentUser.profile.animal_name}
              />
            ) : (
              <h2 className="text-[2rem] font-extrabold">Languages</h2>
            )}
          </div>
        </form>
      </div>
    );
  return <div className="w-[10em] h-[10em]">User not found</div>;
}
