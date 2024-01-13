import Link from "next/link";
import { ContentByLevel } from "src/types";

export default function ReadingSection(props: ContentByLevel) {
  const { level, data } = props;
  return (
    <div className="">
      <h3 className="font-bold text-lg">{level}</h3>
      <div className="grid grid-cols-4 gap-3">
        {data &&
          data.length > 0 &&
          data.map((detail) => (
            <div key={detail.id} className="flex mt-2 flex-col gap-0 border-r-">
              <Link
                className="link font-bold leading-4 text-lg link-primary"
                href={`reading/${detail.id}`}
              >
                {detail.title}
              </Link>
              <span className="block font-light">
                {detail.details && detail.details[0]
                  ? detail.details[0].description
                  : ""}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
