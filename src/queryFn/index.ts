import {
  handleApiRequest,
  handleCustomApiRequest,
} from "src/shared/clientShared";

const getUrl =
  process.env.NODE_ENV === "production"
    ? "https://personal-blog-delta-amber.vercel.app"
    : "http://localhost:3000";

const getReadingById = async <T,>(id: string) => {
  return await handleApiRequest<T>(getUrl + "/api/reading/" + id);
};

const getReadingByLanguage = async (name: string) => {
  return await handleApiRequest(getUrl + "/api/reading?name=" + name);
};

const signinUser = async (userData: any) => {
  return await handleCustomApiRequest(
    getUrl + "/api/auth/signin",
    "POST",
    userData
  );
};
const signupUser = async (userData: any) => {
  return await handleCustomApiRequest(
    getUrl + "/api/auth/signup",
    "POST",
    userData
  );
};

const signOutUser = async () => {
  return await handleApiRequest(getUrl + "/api/auth/logout");
};

export {
  getReadingById,
  getReadingByLanguage,
  signinUser,
  getUrl,
  signOutUser,
  signupUser,
};
