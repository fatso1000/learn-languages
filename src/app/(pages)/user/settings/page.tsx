"use client";
import { useEffect, useState } from "react";
import AnimalComponent from "src/components/Animal";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";

export default function Settings() {
  const [currentUser, setCurrentUser] = useState<IUser>();

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
        <div className="flex flex-col gap-5 w-[20em] h-[30em] bg-[#E7E2DF] p-[2em] rounded-[1em] ">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <AnimalComponent
                color={currentUser.profile.color}
                animalName={currentUser.profile.animal_name}
                size="6em"
              />
            </div>
            <div className="flex gap-2">
              <h1 className="text-[1.5em] font-extrabold">
                {currentUser.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full h-[30em]"></div>
      </div>
    );
  return <div className="w-[10em] h-[10em]">User not found</div>;
}
