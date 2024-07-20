import { getTranslations } from "next-intl/server";
import { Link } from "src/shared/navigation";
import { ContentByLevel } from "src/types";

export default async function ReadingSection(props: ContentByLevel) {
  const { level, data, userId } = props;

  const generics = await getTranslations("generics");

  return (
    <div className="border-b-2 pb-5">
      <div className="inline-flex justify-between items-center w-full">
        <h3 className="badge badge-success font-bold text-md">{level}</h3>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-3">
        {data &&
          data.length > 0 &&
          data.map((detail) => (
            <div
              key={detail.id}
              className="flex mt-2 flex-col justify-between gap-3 border-2 p-3 rounded-md"
            >
              <div className="flex flex-col">
                <h3 className="font-black text-xl leading-none uppercase">
                  {detail.title}
                </h3>
                <span className="font-semibold text-neutral-500 leading-none">
                  {(detail.details &&
                    detail.details[0] &&
                    detail.details[0].description) ||
                    ""}
                </span>
              </div>
              <Link
                href={`reading/${detail.id}${
                  userId ? "?userId=" + userId : ""
                }`}
                className="btn"
              >
                {generics("read")}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
