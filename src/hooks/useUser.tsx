import { useEffect, useState } from "react";
import { getCurrentUser, isUserLoggedIn } from "src/shared/cookies";
import { IUser } from "src/types";

export default function useUser(props?: any) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  const checkUserLoggedIn = async () => {
    const isLoggedIn = await isUserLoggedIn();
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    checkUser();
    checkUserLoggedIn();
  }, [props]);

  return { currentUser, isLoggedIn };
}
