import { cookies } from "next/headers";
import { LevelManager } from "src/components/LevelExercises";
import { getExercises } from "src/queryFn";
import { ILives, IStrikes, IUser } from "src/types";

export default async function Course(props: any) {
  if (
    !(await props.searchParams) ||
    !(await props.searchParams).unit_id ||
    !(await props.searchParams).difficulty ||
    !(await props.searchParams).section_id ||
    !(await props.searchParams).lang
  )
    return <div></div>;
  const request = await getExercises(
    (await props.searchParams).difficulty,
    (await props.searchParams).unit_id,
    (await props.searchParams).lang
  );

  const cookieStore = await cookies();
  const cookiesObj = {
    current_user: cookieStore.get("current_user"),
    lives: cookieStore.get("lives"),
    strikes: cookieStore.get("strikes"),
  };

  const currentUser: IUser | undefined =
      cookiesObj.current_user && cookiesObj.current_user.value !== ""
        ? JSON.parse(cookiesObj.current_user.value)
        : undefined,
    lives: ILives | undefined =
      cookiesObj.lives && cookiesObj.lives.value !== ""
        ? JSON.parse(cookiesObj.lives.value)
        : undefined,
    strikes: IStrikes | undefined =
      cookiesObj.strikes && cookiesObj.strikes.value !== ""
        ? JSON.parse(cookiesObj.strikes.value)
        : undefined;

  if (!request.data || !currentUser) return <div></div>;

  return (
    (<LevelManager
      data={request.data}
      sectionId={(await props.searchParams).section_id}
      lang={(await props.searchParams).lang}
      userId={currentUser.id}
      userLives={lives!}
    />)
  );
}
