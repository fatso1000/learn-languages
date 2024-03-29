import { handleCustomApiRequest } from "src/shared/clientShared";
import { IExercise, ISection, IUserCourse } from "src/types";

const getUrl =
  process.env.NODE_ENV === "production"
    ? "https://learn-languages-zeta.vercel.app"
    : "http://localhost:3000";

const getContentById = async <T>(id: string, userId?: string) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/api/content/${id}?userId=${userId}`,
    "GET",
    null,
    true
  );
};

const addOrRemoveUserContent = async <T>(id: string, user_id: string) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/api/userContent`,
    "POST",
    { id, user_id },
    true
  );
};

const addOrUpdateHistorical = async <T>(
  content_id: string,
  user_id: string
) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/api/actions/historical`,
    "POST",
    { content_id, user_id },
    true
  );
};

const completeContent = async <T>(
  user_id: string,
  experience: string,
  content_id: string
) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/api/actions/qa`,
    "POST",
    { user_id, experience, content_id },
    true
  );
};

const getContentByLanguageAndType = async (name: string, type: string) => {
  return await handleCustomApiRequest(
    getUrl + "/api/content?language=" + name + "&type=" + type,
    "GET",
    null,
    true
  );
};

const getCourses = async () => {
  return await handleCustomApiRequest<IUserCourse>(
    getUrl + "/api/course",
    "GET"
  );
};

const getSectionUnits = async (section_id: string) => {
  return await handleCustomApiRequest<ISection>(
    getUrl + "/api/course/section?id=" + section_id,
    "GET"
  );
};

const getExercises = async (
  difficulty: string,
  unit_id: string,
  lang: string
) => {
  return await handleCustomApiRequest<IExercise[]>(
    getUrl +
      "/api/course/level?difficulty=" +
      difficulty +
      "&unit_id=" +
      unit_id +
      "&lang=" +
      lang,
    "GET"
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
    userData,
    true
  );
};

const getDashboardData = async <T>(userId: number, token: string) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/api/dashboard?id=${userId}`,
    "GET",
    null,
    true
  );
};

const signOutUser = async () => {
  return await handleCustomApiRequest(
    getUrl + "/api/auth/logout",
    "POST",
    null
  );
};

const authorizeUser = async (token: any) => {
  return await handleCustomApiRequest(
    getUrl + "/api/auth/verify",
    "PATCH",
    token
  );
};

export {
  getContentByLanguageAndType,
  getContentById,
  signinUser,
  getUrl,
  signOutUser,
  signupUser,
  editUserProfile,
  getDashboardData,
  getCourses,
  getSectionUnits,
  getExercises,
  authorizeUser,
  completeContent,
  addOrUpdateHistorical,
  addOrRemoveUserContent,
};
