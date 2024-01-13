"use server";

import { editUserProfile, getUrl, signinUser, signupUser } from "src/queryFn";
import { setLoginCookies, setUserCookie } from "src/shared/apiShared";
import { handleCustomApiRequest } from "src/shared/clientShared";
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

export async function signInFormValidation(
  currentState: any,
  formData: FormData
) {
  try {
    const email = formData.get("email"),
      password = formData.get("password");

    const user = await signinUser({ email, password });

    if (!user.errors || user.errors.length === 0) {
      const userStringify = JSON.stringify(user.data.user),
        languageStringify = JSON.stringify(
          user.data.user.profile.languages.find(
            (language: SelectedLanguageElement) => language.active
          )
        );
      setLoginCookies(userStringify, languageStringify, user.data.token);
      return { success: true, errors: [] };
    }

    return { errors: user.errors };
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
        language: formData.get("language"),
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
      language_id: +formData.get("language_id")!,
      user_profile_id: currentState.hasOwnProperty("user_profile_id")
        ? +currentState.user_profile_id
        : +formData.get("user_profile_id")!,
      refresh: true,
    });

    const request = await handleCustomApiRequest(
      getUrl + "/api/userLanguage",
      "POST",
      body,
      true
    );

    if (request && request.data) {
      const userStringify = JSON.stringify(request.data[2]),
        languageStringify = JSON.stringify(request.data[1]);
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
    console.error(error);
    return {
      errors: [{ message: "Unknown error" }],
      success: false,
      user_profile_id: currentState.user_profile_id,
    };
  }
}
