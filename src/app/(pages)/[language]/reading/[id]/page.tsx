import { Metadata } from "next";
import { getReadingById } from "src/queryFn";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

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

const QA = (props: any) => {
  return (
    <div className="mt-6 flex flex-col gap-y-5">
      {props.values.map((v: any, i: number) => {
        return (
          <div key={v.id} className="flex flex-col gap-y-1">
            <h3 className="badge badge-neutral badge-lg text-lg">
              Question {i + 1}:
            </h3>
            <h5 className="ml-1">{v.title}</h5>
            <div className="join">
              {v.options.map((x: any) => {
                return (
                  <button key={x} className="btn join-item">
                    {x}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default async function ReadingPageById({
  params,
}: {
  params: { id?: string };
}) {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";
  const readingText = await getReadingById(id!);

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
        {readingText.data.text.map((v: string, i: number) => (
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
        <QA values={readingText.data.question_and_answer} />
      </section>
    </main>
  );
}
