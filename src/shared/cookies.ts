"use server";
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

const getCurrentUser = async () => {
  return await getCookie("current_user");
};

const getSelectedLanguage = async () => {
  return await getCookie("selected_language");
};

const getStrikes = async () => {
  return await getCookie("strikes");
};

const getLives = async () => {
  return await getCookie("lives");
};

const logoutUser = async () => {
  const oneDay = 24 * 60 * 60 * 1000;
  return {
    user: await cookies().set({
      name: "current_user",
      value: "",
      expires: Date.now() - oneDay,
    }),
    token: await cookies().set({
      name: "token",
      value: "",
      expires: Date.now() - oneDay,
    }),
    selected_language: await cookies().set({
      name: "selected_language",
      value: "",
      expires: Date.now() - oneDay,
    }),
  };
};

const deleteCookie = async (cookieKey: string) => {
  try {
    return await cookies().delete(cookieKey);
  } catch (error: any) {
    return undefined;
  }
};

export {
  getBearerToken,
  isUserLoggedIn,
  getCookie,
  getCurrentUser,
  deleteCookie,
  logoutUser,
  getSelectedLanguage,
  getLives,
  getStrikes,
};
