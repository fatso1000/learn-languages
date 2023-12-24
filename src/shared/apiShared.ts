import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { PendingContentContent } from "src/types";
import { CustomError, IUserLogin } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";

const secret = process.env.JWT_SECRET_KEY || "";

const getSearchQuery = (urlString: string, searchParamsNames: string[]) => {
  const url = new URL(urlString);
  const searchParams = new URLSearchParams(url.search);
  return searchParamsNames.map((v) => searchParams.get(v));
};

const setCookie = (cookieKey: string, value: any) => {
  try {
    cookies().set({
      name: cookieKey,
      value: value,
      maxAge: 600,
      path: "/",
    });
    return true;
  } catch (error) {
    return false;
  }
};

const setLoginCookies = (user: string, token: string) => {
  setCookie("current_user", user);
  setCookie("token", token);
};

const setUserCookie = (user: string) => {
  setCookie("current_user", user);
};

const logInUser = (user: IUserLogin) => {
  try {
    const jwt_secret = process.env.JWT_SECRET_KEY || "";
    const data = {
      time: new Date(),
      ...user,
    };
    const options = {
      expiresIn: 3600, // 1 hour
    };
    const token = jwt.sign(data, jwt_secret, options);
    return token;
  } catch (error) {
    return null;
  }
};

const removeCookie = (cookieKey: string) => {
  try {
    cookies().set({ name: cookieKey, maxAge: 0, value: "" });
    return true;
  } catch (error) {
    return false;
  }
};

const verifyToken = (token: string | null) => {
  try {
    if (!token) return undefined;
    return jwt.verify(token, secret);
  } catch (error) {
    return undefined;
  }
};

const verifyUserAuth = (req: NextRequest) => {
  const token = req.headers.get("Authorization");
  const isLoggedIn = verifyToken(token);
  if (!token || !isLoggedIn)
    throw new CustomError({
      errors: [],
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      msg: "Error at authorization.",
    });
};

const groupByContentLevel = (array: PendingContentContent[]) => {
  let obj: any = {};

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (obj.hasOwnProperty(element.level)) {
      obj[element.level] = [...obj[element.level], element];
    } else {
      obj[element.level] = [element];
    }
  }

  const objValues = Object.values(obj);

  return Object.keys(obj).map((elem, i) => ({
    level: elem,
    data: objValues[i],
  }));
};

export {
  groupByContentLevel,
  verifyUserAuth,
  verifyToken,
  setCookie,
  getSearchQuery,
  removeCookie,
  logInUser,
  setLoginCookies,
  setUserCookie,
};
