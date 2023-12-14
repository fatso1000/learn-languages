"use client";
import { useEffect, useState } from "react";
import HomeHeader from "src/components/HomeHeader";
import { getCurrentUser, isUserLoggedIn } from "src/shared/cookies";
import { IUser } from "src/types";
import LoggedInDashboard from "./LoggedInDashboard";

export default function Dashboard(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>();

  const checkUserLoggedIn = async () => {
    const isLoggedIn = await isUserLoggedIn();
    const user = await getCurrentUser();
    setIsLoggedIn(isLoggedIn);
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [props]);

  return (
    <>
      {isLoggedIn && currentUser ? (
        <LoggedInDashboard userId={currentUser.id} />
      ) : (
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <HomeHeader />
        </main>
      )}
    </>
  );
}
