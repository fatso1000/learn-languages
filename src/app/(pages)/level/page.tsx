import { LevelManager } from "src/components/LevelExercises";
import { getExercises } from "src/queryFn";

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

  if (!request.data) return <div></div>;

  return (
    <LevelManager
      data={request.data}
      sectionId={props.searchParams.section_id}
      lang={props.searchParams.lang}
    />
  );
}
