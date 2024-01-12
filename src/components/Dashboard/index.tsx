"use client";
import { useEffect, useState } from "react";
import HomeHeader from "src/components/HomeHeader";
import {
  getCurrentUser,
  getSelectedLanguage,
  isUserLoggedIn,
} from "src/shared/cookies";
import { IUser } from "src/types";
import LoggedInDashboard from "./LoggedInDashboard";

export default function Dashboard(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [selectedLanguage, setSelectedLanguage] = useState<any>();

  const checkUserLoggedIn = async () => {
    const isLoggedIn = await isUserLoggedIn();
    const user = await getCurrentUser();
    const selectedLanguageStr = await getSelectedLanguage();
    setIsLoggedIn(isLoggedIn);
    if (user) {
      setCurrentUser(JSON.parse(user.value));
      setSelectedLanguage(JSON.parse(selectedLanguageStr!.value));
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [props]);

  return (
    <>
      {isLoggedIn && currentUser ? (
        <LoggedInDashboard
          userId={currentUser.id}
          selectedLanguage={selectedLanguage}
        />
      ) : (
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <HomeHeader />
        </main>
      )}
    </>
  );
}
