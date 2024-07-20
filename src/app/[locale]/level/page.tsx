import { cookies } from "next/headers";
import { LevelManager } from "src/components/LevelExercises";
import { getExercises } from "src/queryFn";
import { ILives, IStrikes, IUser } from "src/types";

export default async function Course(props: any) {
  if (
    !props.searchParams ||
    !props.searchParams.unit_id ||
    !props.searchParams.difficulty ||
    !props.searchParams.section_id ||
    !props.searchParams.lang
  )
    return <div></div>;
  const request = await getExercises(
    props.searchParams.difficulty,
    props.searchParams.unit_id,
    props.searchParams.lang
  );

  const cookieStore = cookies();
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
    <LevelManager
      data={request.data}
      sectionId={props.searchParams.section_id}
      lang={props.searchParams.lang}
      userId={currentUser.id}
      userLives={lives!}
    />
  );
}
