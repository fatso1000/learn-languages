import { put } from "@vercel/blob";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { PendingContentContent } from "src/types";
import { CustomError, ILevelBody, ILevelReturn } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";

const secret = process.env.JWT_SECRET_KEY || "";

const getSearchQuery = (urlString: string, searchParamsNames: string[]) => {
  const url = new URL(urlString);
  const searchParams = new URLSearchParams(url.search);
  return searchParamsNames.map((v) => searchParams.get(v));
};

const setCookie = async (cookieKey: string, value: any) => {
  try {
    const cookie = await cookies();
    cookie.set({
      name: cookieKey,
      value: value,
      maxAge: 3600,
      path: "/",
    });
    return true;
  } catch (error) {
    return false;
  }
};

const setLoginCookies = async (
  user: string,
  language: string,
  token?: string,
  lives?: string,
  strikes?: string
) => {
  await setUserCookie(user);
  await setCookie("selected_language", language);
  lives && (await setCookie("lives", lives));
  strikes && (await setCookie("strikes", strikes));
  token && (await setCookie("token", token));
};

const setUserCookie = async (user: string) => {
  await setCookie("current_user", user);
};

const logInUser = (user: any) => {
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

const removeCookie = async (cookieKey: string) => {
  try {
    const cookie = await cookies();
    cookie.set({ name: cookieKey, maxAge: 0, value: "" });
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

const getTTS = async (text: string) => {
  try {
    const petition = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      {
        method: "POST",
        headers: {
          "xi-api-key": "be6d74e85e647e7c221ad26c218ce536",
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: `{"text":"${text}","model_id":"eleven_multilingual_v2","voice_settings":{"similarity_boost":0.5,"stability":0.5}}`,
      }
    );
    const tts = petition.body as ReadableStream<Uint8Array>;
    const blob = await put(`tts/${text}.mp3`, tts, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch (error) {
    return "";
  }
};

const processChoicesArray = (array: string[]) => {
  return array.map((choice: string) => {
    return { text: choice };
  });
};

const basicValidations = (data: ILevelBody) =>
  !!(
    data.prompt &&
    data.prompt.length > 0 &&
    data.unitId &&
    data.type &&
    data.targetLanguage &&
    data.sourceLanguage &&
    data.difficulty
  );

const translationValidation = (data: ILevelBody) =>
  !!(data.choices && basicValidations(data));

const writeDownValidation = (data: ILevelBody) => !!basicValidations(data);

const chooseCorrectValidation = (data: ILevelBody) =>
  !!(data.correctAnswers && data.choices && basicValidations(data)) ||
  (data.correctAnswers && data.correctAnswers.length === 0) ||
  (data.choices && data.choices.length === 0);

const completeSentenceValidation = (data: ILevelBody) =>
  !!(
    data.compactTranslations &&
    data.correctSolutions &&
    basicValidations(data)
  ) ||
  (data.compactTranslations && data.compactTranslations.length === 0) ||
  (data.correctSolutions && data.correctSolutions.length === 0);

const generateLevelData = async (data: ILevelBody) => {
  const {
    difficulty,
    sourceLanguage,
    targetLanguage,
    type,
    choices,
    compactTranslations,
    correctAnswers,
    correctSolutions,
    prompt,
    solutionTranslation,
  } = data;
  switch (type) {
    case "Translation":
      if (!translationValidation(data)) return undefined;
      const ttsT = await getTTS(prompt!);
      const choicesT = processChoicesArray(choices!);
      const correctIndicesT: number[] = [];
      correctAnswers?.forEach((answer) => {
        for (let index = 0; index < choices!.length; index++) {
          const element = choices![index];
          if (answer === element) correctIndicesT.push(index);
        }
      });
      return {
        correctAnswers,
        correctSolutions,
        prompt,
        tts: ttsT,
        choices: choicesT,
        compactTranslations,
        difficulty,
        sourceLanguage,
        targetLanguage,
        type,
        correctIndices: correctIndicesT,
      } as ILevelReturn;
    case "WriteDown":
      if (!writeDownValidation(data)) return undefined;
      const ttsWD = await getTTS(prompt!);
      return {
        compactTranslations,
        difficulty,
        prompt,
        solutionTranslation,
        sourceLanguage,
        targetLanguage,
        type,
        tts: ttsWD,
      } as ILevelReturn;
    case "ChooseCorrect":
      if (!chooseCorrectValidation(data)) return undefined;
      const ttsCC = await getTTS(prompt!);
      const choicesCC = processChoicesArray(choices!);
      const correctIndex = +correctAnswers![0];
      return {
        choices: choicesCC,
        correctIndex,
        difficulty,
        prompt,
        sourceLanguage,
        targetLanguage,
        tts: ttsCC,
        type,
      } as ILevelReturn;
    case "CompleteSentence":
      if (!completeSentenceValidation(data)) return undefined;
      // const ttsCS = await getTTS(compactTranslations![0]);
      const ttsCS = "";
      const displayTokens: any[] = correctSolutions![0]
        .split(/([ ,.!]+)/)
        .map((choice) => {
          if (choice.trim() === "")
            return {
              text: choice,
              isBlank: false,
            };
          const regex = /^%.*%$/;
          const isBlank = regex.test(choice);
          return {
            text: isBlank ? choice.replace(/%/g, "").trim() : choice,
            isBlank,
          };
        });
      return {
        displayTokens,
        difficulty,
        sourceLanguage,
        prompt,
        targetLanguage,
        tts: ttsCS,
        type,
      } as ILevelReturn;

    default:
      return undefined;
  }
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
  getTTS,
  generateLevelData,
};
