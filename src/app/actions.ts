"use server";

import { logoutUser } from "src/shared/cookies";

export async function logoutUserAction() {
  await logoutUser();
}
