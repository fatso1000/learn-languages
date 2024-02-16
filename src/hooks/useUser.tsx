import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getLives,
  getSelectedLanguage,
  isUserLoggedIn,
} from "src/shared/cookies";
import { IUser } from "src/types";

export default function useUser(props?: any) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [selectedLanguage, setSelectedLanguage] = useState<any>();
  const [userLives, setUserLives] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = async () => {
    const user = await getCurrentUser();
    const selectedLanguageStr = await getSelectedLanguage();
    const lives = await getLives();
    if (user) {
      setCurrentUser(JSON.parse(user.value));
      setSelectedLanguage(JSON.parse(selectedLanguageStr!.value));
      setUserLives(JSON.parse(lives!.value));
    }
  };

  const checkUserLoggedIn = async () => {
    const isLoggedIn = await isUserLoggedIn();
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    checkUser();
    checkUserLoggedIn();
  }, [props]);

  return { currentUser, isLoggedIn, selectedLanguage, userLives };
}
