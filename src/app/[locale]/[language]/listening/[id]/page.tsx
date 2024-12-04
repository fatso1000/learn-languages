import { getContentById } from "src/queryFn";
import { PendingContentContent } from "src/types";
import Navbar from "src/components/Navbar";
import ErrorComponent from "src/components/Error";
import ListeningManager from "src/components/Listening/ListeningManager";

export default async function ListeningPageById(
  props0: {
    params: Promise<{ id?: string; language?: string }>;
    searchParams: Promise<{ userId?: string }>;
  }
) {
  const searchParams = await props0.searchParams;
  const params = await props0.params;
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
      <main className="mt-4 mb-20 md:mb-4 max-w-[1100px] m-auto px-4 xl:py-8 md:px-8 flex flex-col gap-x-4 xl:border-2 xl:rounded-md">
        <ListeningManager
          isMarked={isMarked}
          userId={userId}
          language={params.language}
          data={data}
          isCompleteSection={readingText.data.isCompleted}
          contentId={id!}
          values={
            data.details && data.details[0]
              ? data.details[0].question_and_answer
              : []
          }
        />
      </main>
    </>
  );
}
