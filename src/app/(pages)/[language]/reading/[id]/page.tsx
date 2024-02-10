import { Metadata } from "next";
import { getContentById } from "src/queryFn";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { PendingContentContent } from "src/types";
import QA from "src/components/Reading/QA";

export async function generateMetadata({
  params,
}: {
  params: { id?: string };
}): Promise<Metadata> {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";

  return {
    title: "English Reading: ",
    description: "",
  };
}

export default async function ReadingPageById({
  params,
}: {
  params: { id?: string };
}) {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";
  const readingText = await getContentById<PendingContentContent>(id!);
  if (readingText.errors.length > 0 || !readingText.data)
    return <div>ERROR</div>;

  return (
    <main className="mt-4 max-w-[1100px] m-auto px-4 md:px-8 grid grid-cols-1 xl:grid-cols-2 gap-x-4 xl:border-2">
      <header className="mb-4 border-b-2 xl:border-0">
        <Link className="btn" href={"/english/reading"}>
          <IoArrowBack />
        </Link>
        <h1 className="text-5xl mt-6 mb-3 font-black">
          {readingText.data.title}
        </h1>
        {readingText.data.details &&
          readingText.data.details[0] &&
          readingText.data.details[0].text.map((v: string, i: number) => (
            <p key={i} className="mb-4 font-medium">
              {v}
            </p>
          ))}
      </header>
      <section className="flex flex-col">
        <div className="h-12">
          <h2 className="text-2xl font-black">Answer this questions!</h2>
          <span>Select the right answer :)</span>
        </div>
        <QA
          values={
            readingText.data.details && readingText.data.details[0]
              ? readingText.data.details[0].question_and_answer
              : []
          }
        />
      </section>
    </main>
  );
}
