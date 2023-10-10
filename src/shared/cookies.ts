import { cookies } from "next/headers";

const getCookie = async (cookieKey: string) => {
  try {
    return await cookies().get(cookieKey);
  } catch (error: any) {
    return undefined;
  }
};

const isUserLoggedIn = async () => {
  const user = await getBearerToken();
  return user.user || user.token ? true : false;
};

const getBearerToken = async () => {
  return {
    user: await getCookie("current_user"),
    token: await getCookie("token"),
  };
};

export { getBearerToken, isUserLoggedIn, getCookie };
