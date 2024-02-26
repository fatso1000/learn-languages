import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getLives,
  getSelectedLanguage,
  getStrikes,
  isUserLoggedIn,
} from "src/shared/cookies";
import { ILives, IStrikes, IUser } from "src/types";

export default function useUser(props?: any) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [selectedLanguage, setSelectedLanguage] = useState<any>();
  const [userLives, setUserLives] = useState<ILives>();
  const [strikes, setStrikes] = useState<IStrikes>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = async () => {
    const user = await getCurrentUser(),
      selectedLanguageStr = await getSelectedLanguage(),
      lives = await getLives(),
      strikes = await getStrikes();

    if (user) {
      setCurrentUser(JSON.parse(user.value));
      setSelectedLanguage(JSON.parse(selectedLanguageStr!.value));
      setUserLives(JSON.parse(lives!.value));
      setStrikes(JSON.parse(strikes!.value));
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

  return { currentUser, isLoggedIn, selectedLanguage, userLives, strikes };
}
