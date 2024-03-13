import { getContentById } from "src/queryFn";
import { PendingContentContent } from "src/types";
import QA from "src/components/Reading/QA";
import Navbar from "src/components/Navbar";
import ReadingHeader from "src/components/Reading/ReadingHeader";
import Listening from "./Listening";
import ErrorComponent from "src/components/Error";

export default async function ListeningPageById({
  params,
  searchParams,
}: {
  params: { id?: string };
  searchParams: { userId?: string };
}) {
  const id = params.hasOwnProperty("id") ? params["id"] : "1",
    userId = searchParams.hasOwnProperty("userId")
      ? searchParams["userId"]
      : undefined;

  const readingText = await getContentById<{
    data: PendingContentContent;
    isMarked: boolean;
    isCompleted: boolean;
  }>(id!, userId);

  if (readingText.errors.length > 0 || !readingText.data)
    return <ErrorComponent />;

  const { data, isMarked } = readingText.data;

  return (
    <>
      <Navbar props={{ params }} />
      <main className="mt-4 mb-20 md:mb-4 max-w-[1100px] m-auto px-4 xl:py-8 md:px-8 grid grid-cols-1 xl:grid-cols-2 gap-x-4 xl:border-2 xl:rounded-md">
        <header className="mb-4 border-b-2 xl:border-0">
          <ReadingHeader content_id={id} isMarked={isMarked} userId={userId} />
          <h1 className="text-5xl mt-6 mb-3 font-black">{data.title}</h1>
          {data.details &&
            data.details[0] &&
            data.details[0].text.map((v: string, i: number) => (
              <Listening key={i} text={v} />
            ))}
        </header>
        <section className="flex flex-col">
          <div className="h-12">
            <h2 className="text-2xl font-black">Answer this questions!</h2>
            <span>Select the right answer :)</span>
          </div>
          <QA
            isCompleted={readingText.data.isCompleted}
            contentId={id!}
            userId={userId}
            values={
              data.details && data.details[0]
                ? data.details[0].question_and_answer
                : []
            }
          />
        </section>
      </main>
    </>
  );
}
