import {
  handleApiRequest,
  handleCustomApiRequest,
} from "src/shared/clientShared";

const getUrl =
  process.env.NODE_ENV === "production"
    ? "https://personal-blog-delta-amber.vercel.app"
    : "http://localhost:3000";

const getContentById = async <T>(id: string) => {
  return await handleApiRequest<T>(getUrl + "/api/content/" + id);
};

const getContentByLanguageAndType = async (name: string, type: string) => {
  return await handleApiRequest(
    getUrl + "/api/content?language=" + name + "&type=" + type
  );
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
const editUserProfile = async (userData: any, userId: number) => {
  return await handleCustomApiRequest(
    getUrl + `/api/auth/profile/${userId}`,
    "PATCH",
    userData
  );
};

const signOutUser = async () => {
  return await handleApiRequest(getUrl + "/api/auth/logout");
};

export {
  getContentByLanguageAndType,
  getContentById,
  signinUser,
  getUrl,
  signOutUser,
  signupUser,
  editUserProfile,
};
