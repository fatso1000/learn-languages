"use server";

import { redirect } from "next/navigation";
import { editUserProfile } from "src/queryFn";
import { setUserCookie } from "src/shared/apiShared";

export async function submitForm(
  userId: number | undefined,
  formData: FormData
) {
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

  const user = await editUserProfile(editProfile, userId ? userId : NaN);

  if (!user.error) {
    setUserCookie(JSON.stringify(user.data.user));
  }

  redirect(user.error ? `?error=${user.error}` : "/user/profile");
}
