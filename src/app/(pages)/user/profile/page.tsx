"use client";

import { useEffect, useState } from "react";
import AnimalComponent from "src/components/Animal";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUser();
  }, []);
  if (currentUser && currentUser.profile)
    return (
      <div className="flex bg-[#f0edea] rounded-[1em] mx-[10em] my-[2em]">
        <div className="flex flex-col  gap-5 w-[20em] h-[35em] bg-[#E7E2DF] p-[2em] rounded-[1em] ">
          <div className="flex flex-col items-center gap-4">
            <AnimalComponent
              color={currentUser.profile.color}
              animalName={currentUser.profile.animal_name}
              size="6em"
            />
            <h1 className="text-[1.5em] font-extrabold">{currentUser.name}</h1>
          </div>
          <ul className="flex flex-col justify-between h-full">
            <li className="flex flex-col items-center">
              <span className="font-bold">Email</span> {currentUser.email}
            </li>
            <li className="mt-auto">
              <ul className="flex flex-col gap-2">
                <li className="flex flex-col items-center w-full">
                  <button className="btn bg-[#e3d7cf] hover:bg-[#d9c8bc] border-0 w-[90%]">
                    Change Password
                  </button>
                </li>
                <li className="flex flex-col items-center">
                  <button className="btn btn-error hover:bg-[#f65c5c] w-[90%] text-neutral-50 border-0">
                    Delete Account
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-full p-[3em]">
          <h2 className="text-[2rem] font-extrabold">Languages</h2>
        </div>
      </div>
    );
  return <div className="w-[10em] h-[10em]"></div>;
}
