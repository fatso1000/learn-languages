import ReadingList from "src/components/Reading";
import { Metadata } from "next";
import { Languages } from "src/types";
import { getReadingByLanguage } from "src/queryFn";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Search Blog By Name - Matias Benitez Blog",
    description: "",
  };
}

const languageslist = [
  Languages.english,
  Languages.french,
  Languages.spanish,
  Languages.german,
  Languages.japanese,
];

export default async function ReadingsPage({ params }: any) {
  const language = params.hasOwnProperty("language")
    ? params["language"]
    : undefined;

  if (!language || languageslist.includes(language)) return <div>ERROR</div>;
  const readingTexts = await getReadingByLanguage(language);
  if (!readingTexts.data || readingTexts.error) return <div>ERROR</div>;

  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <header className="mb-4">
        <h1 className="text-2xl leading-6 font-black first-letter:uppercase">
          {language} texts for begginers
        </h1>
        <p>
          This are some of the best text to learn and practice {language} online
          and for free.
        </p>
      </header>
      <section className="flex flex-col gap-y-5">
        <ReadingList values={readingTexts.data} />
      </section>
    </main>
  );
}
