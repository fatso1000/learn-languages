import ListeningSection from "./ListeningSection";

export default function ListeningList(props: any) {
  return (
    props.values &&
    props.values.length > 0 &&
    props.values.map((v: any) => (
      <ListeningSection {...v} userId={props.userId} key={v.section} />
    ))
  );
}
