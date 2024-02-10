import ReadingSection from "./ReadingSection";

export default function ReadingList(props: any) {
  return (
    props.values &&
    props.values.length > 0 &&
    props.values.map((v: any) => <ReadingSection {...v} key={v.section} />)
  );
}
