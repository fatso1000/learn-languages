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
    title: "Search Blog By Name - Matias Benitez Blog",
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

  if (readingText.error || !readingText.data) return <div>ERROR</div>;

  return (
    <main className="mt-4 max-w-[1100px] m-auto px-4 sm:px-4 md:px-16 grid grid-cols-2 gap-x-4">
      <header className="mb-4">
        <Link className="btn" href={"/english/reading"}>
          <IoArrowBack />
          Go back
        </Link>
        <h1 className="text-2xl mt-6 mb-3 leading-6 font-black">
          {readingText.data.title}
        </h1>
        {readingText.data.details &&
          readingText.data.details[0] &&
          readingText.data.details[0].text.map((v: string, i: number) => (
            <p key={i} className="mb-6">
              {v}
            </p>
          ))}
      </header>
      <section className="flex flex-col">
        <div className="h-12">
          <h2 className="text-2xl font-black">Answer this questions!</h2>
          <p>Select the right answer :)</p>
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
