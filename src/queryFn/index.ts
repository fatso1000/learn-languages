import { handleCustomApiRequest } from "src/shared/clientShared";
import { IExercise, ILevel, ISection, IUserCourse } from "src/types";

const getUrl =
  process.env.NODE_ENV === "production"
    ? "https://learn-languages-zeta.vercel.app"
    : "http://localhost:3000";

const getContentById = async <T>(id: string) => {
  return await handleCustomApiRequest<T>(getUrl + "/api/content/" + id, "GET");
};

const getContentByLanguageAndType = async (name: string, type: string) => {
  return await handleCustomApiRequest(
    getUrl + "/api/content?language=" + name + "&type=" + type,
    "GET"
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

const getExercises = async (difficulty: string, unit_id: string) => {
  return await handleCustomApiRequest<IExercise[]>(
    getUrl +
      "/api/course/level?difficulty=" +
      difficulty +
      "&unit_id=" +
      unit_id,
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
};
