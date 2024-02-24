import { cookies } from "next/headers";
import { LevelManager } from "src/components/LevelExercises";
import { getExercises } from "src/queryFn";
import { IUser } from "src/types";

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
  };

  const currentUser: IUser | undefined =
    cookiesObj.current_user && cookiesObj.current_user.value !== ""
      ? JSON.parse(cookiesObj.current_user.value)
      : undefined;

  if (!request.data || !currentUser) return <div></div>;

  return (
    <LevelManager
      data={request.data}
      sectionId={props.searchParams.section_id}
      lang={props.searchParams.lang}
      userId={currentUser.id}
    />
  );
}
