import { useEffect, useState } from "react";
import { getCurrentUser } from "src/shared/cookies";
import { IUser } from "src/types";

export default function useCurrentUser(props?: any) {
  const [currentUser, setCurrentUser] = useState<IUser>();

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setCurrentUser(JSON.parse(user.value));
  };

  useEffect(() => {
    checkUser();
  }, [props]);

  return currentUser;
}
