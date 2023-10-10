import Link from "next/link";
import { IReadingSections } from "src/types";

export default function ReadingSection(props: IReadingSections) {
  const { locked_texts, reading_texts, title } = props;
  return (
    <div className="">
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {reading_texts.map((v) => (
          <div key={v.id} className="flex mt-2 flex-col gap-0 border-r-">
            <Link
              className="link font-bold leading-4 text-lg link-primary"
              href={`reading/${v.id}`}
            >
              {v.title}
            </Link>
            <span className="block font-light">{v.description}</span>
          </div>
        ))}
      </div>
      <div>Locked Texts: {locked_texts}</div>
    </div>
  );
}
