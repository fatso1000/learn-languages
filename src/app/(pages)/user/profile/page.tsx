"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";
import AsideProfile from "./AsideProfile/AsideProfile";

export default function UserProfile() {
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
        <AsideProfile currentUser={currentUser} />
        <div className="w-full p-[3em]">
          <h2 className="text-[2rem] font-extrabold">Languages</h2>
        </div>
      </div>
    );
  return <div className="w-[10em] h-[10em]">User not found</div>;
}
