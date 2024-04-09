"use server";

import { ExerciseType } from "@prisma/client";
import { logoutUserAction } from "src/app/[locale]/actions";
import {
  addOrRemoveLives,
  completeContent,
  continueOrFailStrikes,
  editUserProfile,
  getUrl,
  signinUser,
  signupUser,
} from "src/queryFn";
import {
  setCookie,
  setLoginCookies,
  setUserCookie,
} from "src/shared/apiShared";
import { handleCustomApiRequest } from "src/shared/clientShared";
import { getCurrentUser } from "src/shared/cookies";
import { redirect } from "src/shared/navigation";
import { SelectedLanguageElement } from "src/types";

export async function signUpFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const name = formData.get("name"),
      email = formData.get("email"),
      password = formData.get("password"),
      repeat_password = formData.get("repeat_password"),
      language = formData.get("language");

    if (password === repeat_password) {
      const user = await signupUser({ email, password, name, language });
      if (user.errors.length > 0) {
        return { errors: user.errors, success: false };
      }
      return { errors: [], success: true };
    } else {
      return {
        errors: [{ message: "Passwords do not match." }],
        success: false,
      };
    }
  } catch (error) {
    return { errors: ["Unknown error"], success: false };
  }
}

export async function continueOrFailStrikesServer(userId: number) {
  try {
    const request = await continueOrFailStrikes(userId);
    if (
      !request ||
      !request.data ||
      (request.data && Object.keys(request.data).length === 0) ||
      request.message ||
      request.errors.length > 0
    )
      return;
    setCookie("strikes", JSON.stringify(request.data));
  } catch (error) {
    return;
  }
}

export async function completeExerciseContent(
  user_id: string,
  experience: string,
  content_id: string
) {
  try {
    const request = await completeContent(user_id, experience, content_id);
    const userCookie = await getCurrentUser();
    if (
      !request ||
      !userCookie ||
      !request.data ||
      (request.data && Object.keys(request.data).length === 0) ||
      request.message ||
      request.errors.length > 0
    )
      return;

    const { rank, ...currentUser } = JSON.parse(userCookie.value);

    const newExperience = rank.user_experience + Number(experience);

    const updatedCurrentUser = {
      ...currentUser,
      rank: { ...rank, user_experience: newExperience },
    };

    setCookie("current_user", JSON.stringify(updatedCurrentUser));
  } catch (error) {
    return;
  }
}

export async function addOrRemoveLifesServer(
  userId: number,
  type: "sum" | "lose"
) {
  try {
    const request = await addOrRemoveLives(userId, { type });
    if (
      !request ||
      !request.data ||
      request.message ||
      request.errors.length > 0
    )
      return;
    setCookie("lives", JSON.stringify(request.data));
  } catch (error) {
    return;
  }
}

export async function signInFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const email = formData.get("email"),
      password = formData.get("password");

    const user = await signinUser({ email, password });

    if (!user.message || !user.errors || user.errors.length === 0) {
      const { lives, last_strike_date, strikes_length, last_live_date } =
        user.data.user.lives_and_strikes;
      const userStringify = JSON.stringify(user.data.user),
        languageStringify = JSON.stringify(
          user.data.user.profile.languages.find(
            (language: SelectedLanguageElement) => language.active
          )
        ),
        livesStringify = JSON.stringify({ lives, last_live_date }),
        strikesStringify = JSON.stringify({ strikes_length, last_strike_date });
      setLoginCookies(
        userStringify,
        languageStringify,
        user.data.token,
        livesStringify,
        strikesStringify
      );
      return { success: true, errors: [] };
    }

    return { errors: user.errors, success: false };
  } catch (error) {
    return { errors: [{ message: "Unknown error" }], success: false };
  }
}

export async function editProfileFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const userId = Number(formData.get("id"));

    const profile = Object.fromEntries(
      Object.entries({
        color: formData.get("color"),
        animal_name: formData.get("animal"),
      }).filter((value) => value[1])
    );

    const editProfile: any = Object.fromEntries(
      Object.entries({
        name: formData.get("name"),
        biography: formData.get("biography"),
        ubication: formData.get("ubication"),
        profile: Object.keys(profile).length !== 0 && profile,
      }).filter((value) => value[1])
    );

    const user = await editUserProfile(editProfile, userId);

    if (!user.errors || user.errors.length === 0) {
      setUserCookie(JSON.stringify(user.data.user));
      return { success: true, errors: [] };
    }

    return { errors: user.errors };
  } catch (error) {
    return { errors: [{ message: "Unknown error" }], success: false };
  }
}

export async function selectUserLanguageFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const body = JSON.stringify({
      language: formData.get("language"),
      user_profile_id: currentState.hasOwnProperty("user_profile_id")
        ? +currentState.user_profile_id
        : +formData.get("user_profile_id")!,
    });

    const request = await handleCustomApiRequest(
      getUrl + "/api/userLanguage",
      "POST",
      body,
      true
    );
    if (request && request.data) {
      const userStringify = JSON.stringify(
          request.data[request.data.length - 1]
        ),
        languageStringify = JSON.stringify(request.data[2]);
      setLoginCookies(userStringify, languageStringify);
      return {
        errors: [],
        success: true,
        user_profile_id: currentState.user_profile_id,
      };
    }

    return {
      errors: [],
      success: false,
      user_profile_id: currentState.user_profile_id,
    };
  } catch (error) {
    return {
      errors: [{ message: "Unknown error" }],
      success: false,
      user_profile_id: currentState.user_profile_id,
    };
  }
}

export async function userDeleteLanguage(
  course_id: number,
  language_combo_id: number,
  user_id: number
) {
  try {
    const request = await handleCustomApiRequest(
      getUrl + "/api/userCourse/" + course_id,
      "DELETE",
      { user_id, language_combo_id },
      true
    );

    if (request && request.data) {
      const userStringify = JSON.stringify(request.data.removePassword),
        languageStringify = JSON.stringify(
          request.data.removePassword.profile.languages.find(
            (language: SelectedLanguageElement) => language.active
          )
        );
      setLoginCookies(userStringify, languageStringify);
      return null;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function userPasswordFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const user_id = currentState.hasOwnProperty("user_id")
      ? +currentState.user_id
      : +formData.get("user_id")!;
    const old_password = formData.get("old_password"),
      new_password = formData.get("new_password");

    const request = await handleCustomApiRequest(
      getUrl + "/api/user/" + user_id + "/password",
      "PATCH",
      { old_password, new_password },
      true
    );

    if (request && request.data) {
      return {
        errors: [],
        success: true,
        user_id: currentState.user_id,
      };
    }

    return {
      errors: [request],
      success: false,
      user_id: currentState.user_id,
    };
  } catch (error) {
    return {
      errors: [{ message: "Unknown error" }],
      success: false,
      user_id: currentState.user_id,
    };
  }
}

export async function userAccountFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const user_id = currentState.hasOwnProperty("user_id")
        ? +currentState.user_id
        : +formData.get("user_id")!,
      new_email = formData.get("email");

    const request = await handleCustomApiRequest(
      getUrl + "/api/user/" + user_id + "/email",
      "PATCH",
      new_email,
      true
    );

    if (request && request.data) {
      return {
        errors: [],
        success: true,
        user_id: currentState.user_id,
      };
    }

    return {
      errors: [request],
      success: false,
      user_id: currentState.user_id,
    };
  } catch (error) {
    return {
      errors: [{ message: "Unknown error" }],
      success: false,
      user_id: currentState.user_id,
    };
  }
}

export async function deleteUserFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const user_id = currentState.hasOwnProperty("user_id")
      ? +currentState.user_id
      : +formData.get("user_id")!;

    const request = await handleCustomApiRequest(
      getUrl + "/api/user/" + user_id,
      "DELETE",
      null,
      true
    );

    if (request && request.data) {
      await logoutUserFormAction();
      return {
        errors: [],
        success: true,
        user_id: currentState.user_id,
      };
    }

    return {
      errors: [],
      success: false,
      user_id: currentState.user_id,
    };
  } catch (error) {
    return {
      errors: [{ message: "Unknown error" }],
      success: false,
      user_id: currentState.user_id,
    };
  }
}

export async function logoutUserFormAction() {
  await logoutUserAction();
  redirect("/");
}

export async function exercisesLevelFormAction(
  currentState: any,
  formData: FormData
) {
  try {
    const choices = formData.getAll("choices"),
      compactTranslations = formData.getAll("compactTranslations"),
      correctSolutions = formData.getAll("correctSolutions"),
      correctAnswers = formData.getAll("correctAnswers"),
      prompt = formData.get("prompt"),
      solutionTranslation = formData.get("solutionTranslation"),
      sourceLanguage = formData.get("sourceLanguage"),
      targetLanguage = formData.get("targetLanguage"),
      unitId = formData.get("unitId"),
      type = formData.get("type"),
      difficulty = formData.get("difficulty");
    let body: any = {
      prompt,
      unitId: unitId ? +unitId : null,
      type,
      targetLanguage,
      sourceLanguage,
      difficulty,
    };

    switch (type) {
      case ExerciseType.ChooseCorrect:
        body = {
          ...body,
          correctAnswers,
          choices,
        };
        break;

      case ExerciseType.CompleteSentence:
        body = { ...body, compactTranslations, correctSolutions };
        break;

      case ExerciseType.Translation:
        body = {
          ...body,
          compactTranslations,
          correctSolutions,
          choices,
          correctAnswers,
        };
        break;

      case ExerciseType.WriteDown:
        body = { ...body, compactTranslations, solutionTranslation };
        break;

      default:
        break;
    }

    const request = await handleCustomApiRequest(
      getUrl + "/api/course/level",
      "POST",
      body,
      true
    );

    if (request && request.data) {
      return {
        errors: [],
        success: true,
      };
    }

    return {
      errors: [...request.errors, { message: request.message }],
      success: false,
    };
  } catch (error) {
    return { errors: [{ message: "Unknown error" }], success: false };
  }
}
