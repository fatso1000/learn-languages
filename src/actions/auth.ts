"use server";

import { signinUser, signupUser } from "src/queryFn";
import { setLoginCookies } from "src/shared/apiShared";

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
      setLoginCookies(JSON.stringify(user.data.user), user.data.token);
      return { success: true, errors: [] };
    }

    return { errors: user.errors };
  } catch (error) {
    return { errors: [{ message: "Unknown error" }], success: false };
  }
}
